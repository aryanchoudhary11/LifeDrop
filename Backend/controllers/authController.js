import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

const generateAccessToken = async (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = async (userId, userAgent, ip) => {
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await RefreshToken.create({
    userId,
    tokenHash,
    userAgent,
    ip,
    expiresAt,
  });
  return refreshToken;
};
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["DONOR", "SEEKER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exsted" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
    });

    const accessToken = await generateAccessToken(user);

    const refreshToken = await generateRefreshToken(
      user._id,
      req.headers["user-agent"] || "unknown",
      req.ip
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

const generateAccessToken = async (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
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

const hashRefresh = (raw) =>
  crypto.createHash("sha256").update(raw).digest("hex");

const revokeAllUserTokens = async (userId) => {
  await RefreshToken.updateMany(
    { userId, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    });

    const accessToken = await generateAccessToken(user);

    const refreshToken = await generateRefreshToken(
      user._id,
      req.headers["user-agent"] || "unknown",
      req.ip
    );
    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // TODO: Send email with this link instead of just returning
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
      verificationLink,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ code: "InvalidCredentials", message: "Invalid Credentials" });
    }
    if (user.status === "SUSPENDED") {
      return res
        .status(423)
        .json({ code: "UserSuspended", message: "User Suspended" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ code: "InvalidCredentials", message: "Invalid Credentials" });
    }

    const accessToken = await generateAccessToken(user);

    const refreshToken = await generateRefreshToken(
      user._id,
      req.headers["user-agent"] || "unknown",
      req.ip
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    let verificationLink = null;
    if (!user.isEmailVerified) {
      const verificationToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
      verificationLink,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const raw = req.cookies?.refreshToken;
    if (!raw) {
      return res.status(401).json({
        code: "InvalidOrExpiredRefresh",
        message: "No refresh token provided",
      });
    }

    const tokenHash = hashRefresh(raw);
    const tokenDoc = await RefreshToken.findOne({ tokenHash });

    if (!tokenDoc) {
      return res.status(401).json({
        code: "InvalidOrExpiredRefresh",
        message: "Invalid or expired refresh token",
      });
    }

    if (tokenDoc.revokedAt) {
      await revokeAllUserTokens(tokenDoc.userId);
      res.clearCookie("refreshToken");
      return res.status(409).json({
        code: "TokenReuseDetected",
        message: "Refresh token reuse detected. All sessions revoked.",
      });
    }

    if (tokenDoc.expiresAt <= new Date()) {
      tokenDoc.revokedAt = new Date();
      await tokenDoc.save();
      res.clearCookie("refreshToken");
      return res.status(401).json({
        code: "InvalidOrExpiredRefresh",
        message: "Invalid or expired refresh token",
      });
    }

    tokenDoc.revokedAt = new Date();
    await tokenDoc.save();

    const user = await User.findById(tokenDoc.userId);
    if (!user || user.status === "SUSPENDED") {
      await revokeAllUserTokens(tokenDoc.userId);
      res.clearCookie("refreshToken");
      return res.status(401).json({
        code: "InvalidOrExpiredRefresh",
        message: "User not valid for refresh",
      });
    }
    const accessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(
      user._id,
      req.headers["user-agent"] || "unknown",
      req.ip
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const raw = req.cookies?.refreshToken;
    if (raw) {
      const tokenHash = hashRefresh(raw);
      await RefreshToken.updateOne(
        { tokenHash, revokedAt: null },
        { $set: { revokedAt: new Date() } }
      );
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Strict",
    });
    return res.status(204).send();
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const me = async (req, res) => {
  const { id, name, email, isEmailVerified } = req.user;
  return res.status(200).json({ id, name, email, isEmailVerified });
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Missing verification token" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Verify email error: ", err);
    return res.status(400).json({ message: "Unable to verify email" });
  }
};

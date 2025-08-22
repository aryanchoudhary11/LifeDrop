import { validatePassword } from "../utils/validator.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["DONOR", "SEEKER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Week password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exsted" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
    });
  } catch (err) {}
};

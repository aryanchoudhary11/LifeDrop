import express from "express";
import {
  login,
  logOut,
  me,
  refresh,
  register,
  verifyEmail,
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logOut);

router.get("/me", auth, me);
router.get("/verify-email", verifyEmail);

export default router;

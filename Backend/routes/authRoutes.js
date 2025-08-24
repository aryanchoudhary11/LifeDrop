import express from "express";
import {
  login,
  logOut,
  me,
  refresh,
  register,
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";
import { roleGuard } from "../middleware/roleGuard.js";
import { getMyProfile } from "../controllers/donorController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logOut);

router.get("/me", auth, me);
router.get("/donors/me", auth, roleGuard("DONOR"), getMyProfile);

export default router;

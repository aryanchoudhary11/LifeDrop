import express from "express";
import { auth } from "../middleware/auth.js";
import { registerDonor, getMyDonor } from "../controllers/donorController.js";

const router = express.Router();

router.post("/register", auth, registerDonor);
router.get("/me", auth, getMyDonor);

export default router;

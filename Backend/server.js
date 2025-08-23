import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

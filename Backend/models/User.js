import mongoose from "mongoose";

const { Schema } = mongoose;

const ROLES = ["DONOR", "SEEKER"];
const STATUS = ["ACTIVE", "SUSPENDED", "DELETED"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ROLES,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: STATUS,
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, status: 1 });

const User = mongoose.model("User", userSchema);

export default User;

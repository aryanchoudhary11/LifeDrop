import mongoose from "mongoose";
const { Schema } = mongoose;

const BLOOD_TYPE = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const AVAILABILITY = ["AVAILABLE", "TEMP_UNAVAILABLE", "UNAVAILABLE"];

const donorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minLen: 2,
      maxLen: 100,
    },

    bloodType: {
      type: String,
      enum: BLOOD_TYPE,
      required: true,
    },

    location: {
      country: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      pinCode: { type: String, required: true, match: /^[0-9]{6}$/ },
      geo: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    contact: {
      phone: {
        type: String,
        required: true,
        match: [/^\+[1-9]\d{1,14}$/, "Invalid phone format (must be E.164)"],
      },
      alternatePhone: {
        type: String,
        match: [/^\+[1-9]\d{1,14}$/, "Invalid phone format (must be E.164)"],
      },
    },

    availability: {
      type: String,
      enum: AVAILABILITY,
      default: "AVAILABLE",
    },

    lastDonatedDate: {
      type: Date,
    },

    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

donorSchema.index({ bloodType: 1 });
donorSchema.index({ "location.city": 1 });
donorSchema.index({ bloodType: 1, "location.city": 1 });

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;

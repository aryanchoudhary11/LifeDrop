import Donor from "../models/Donor.js";

export const registerDonor = async (req, res) => {
  try {
    const { bloodType, city, pincode } = req.body;
    if (!req.user.isEmailVerified) {
      return res.status(403).json({ message: "Email must be verified first" });
    }
    const existing = await Donor.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(409).json({ message: "Already registered as Donor" });
    }
    const donor = await Donor.create({
      userId: req.user.id,
      bloodType,
      city,
      pincode,
    });

    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (err) {
    console.error("Register donor error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyDonor = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) return res.status(404).json({ message: "Not a donor" });
    res.json(donor);
  } catch (err) {
    console.error("Get donor error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

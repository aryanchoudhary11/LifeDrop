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

export const updateDonor = async (req, res) => {
  try {
    const { bloodType, city, pincode, availability, visibility } = req.body;
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res
        .status(404)
        .json({ message: "You are not registered as a donor" });
    }

    if (bloodType) donor.bloodType = bloodType;
    if (city) donor.city = city;
    if (pincode) donor.pincode = pincode;
    if (availability) donor.availability = availability;
    if (typeof visibility === "boolean") donor.visibility = visibility;

    await donor.save();

    res.json({ message: "Donor details updated successfully", donor });
  } catch (err) {
    console.error("Update donor error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listDonors = async (req, res) => {
  try {
    const { bloodType, pincode } = req.query;
    let filter = { visibility: true, availability: "AVAILABLE" };

    if (pincode) filter.pincode = pincode;
    if (bloodType) filter.bloodType = bloodType;

    const donors = await Donor.find(filter).populate("userId", "name email");
    res.json(donors);
  } catch (err) {
    console.error("List donors error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

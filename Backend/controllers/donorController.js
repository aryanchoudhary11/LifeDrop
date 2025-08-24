import Donor from "../models/Donor.js";

export const getMyProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id }).lean();
    if (!donor) {
      return res.status(404).json({ message: "Donor profile not found" });
    }
    return res.status(200).json(donor);
  } catch (err) {
    console.error("Get donor profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

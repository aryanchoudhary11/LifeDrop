import { useEffect, useState } from "react";
import API from "../services/AuthService.js";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [pincode, setPincode] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDonors = async (pin = "", blood = "") => {
    try {
      setLoading(true);
      let query = [];
      if (pin) query.push(`pincode=${pin}`);
      if (blood) query.push(`bloodType=${encodeURIComponent(blood)}`);
      const { data } = await API.get(
        query.length > 0 ? `/donors/all?${query.join("&")}` : "/donors/all"
      );
      setDonors(data);
    } catch (err) {
      console.error("Failed to fetch donors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors(pincode, bloodType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-4 sm:p-6 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-rose-600 mb-6 font-['Vend_Sans']">
          🩸 Donor Directory
        </h1>

        {/* Search Form */}
        <form
          className="flex flex-col md:flex-row justify-center items-center gap-3 mb-8"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Enter Pincode.."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="p-3 border rounded-xl w-full md:w-60"
          />
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="p-3 border rounded-xl w-full md:w-60"
          >
            <option value="">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 cursor-pointer transition text-sm sm:text-base"
          >
            Search
          </button>
        </form>

        {/* Donors List */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading donors...</p>
        ) : donors.length === 0 ? (
          <p className="text-gray-500 text-center">No donors found.</p>
        ) : (
          <div className="space-y-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="text-xl sm:text-2xl font-bold text-rose-600">
                  {donor.userId?.name || "Anonymous"}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {donor.userId?.email}
                </p>
                <p className="text-sm sm:text-base">
                  <b>Blood Type:</b> {donor.bloodType}
                </p>
                <p className="text-sm sm:text-base">
                  <b>City:</b> {donor.city}
                </p>
                <p className="text-sm sm:text-base">
                  <b>Pincode:</b> {donor.pincode}
                </p>
                <p className="text-sm sm:text-base">
                  <b>Phone:</b> {donor.phone}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

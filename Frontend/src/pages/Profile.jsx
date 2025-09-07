import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { getMe } from "../services/AuthService.js";
import LogoutButton from "../components/Logout.jsx";
import API from "../services/AuthService.js";

export default function Profile() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState();
  const [donor, setDonor] = useState(null);
  const [form, setForm] = useState({ bloodType: "", city: "", pincode: "" });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMe(localStorage.getItem("accessToken"));
        setProfile(data);
        if (data.isEmailVerified) {
          try {
            const donorRes = await API.get("/donors/me");
            setDonor(donorRes.data);
          } catch {
            setDonor(null);
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    if (auth?.accessToken) fetchData();
  }, [auth]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDonorSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/donors/register", form);
      setMessage(data.message);
      setDonor(data.donor);
    } catch (err) {
      setMessage(err.response?.data?.message || "Donor registration failed");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/donors/update", form);
      setMessage(data.message);
      setDonor(data.donor);
      setEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  if (!profile)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto text-3xl font-bold shadow-lg"
        >
          {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
        </motion.div>
        <h2 className="mt-4 font-bold text-2xl text-gray-800">
          {profile.name}
        </h2>
        <p className="text-gray-600">{profile.email}</p>
        <div className="mt-3">
          {profile.isEmailVerified ? (
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              ✅ Verified
            </span>
          ) : (
            <>
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                ⚠️ Verify to register as donar
              </span>
              {auth?.verificationLink && (
                <div className="mt-4">
                  <a
                    href={auth.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition"
                  >
                    Verify Now
                  </a>
                </div>
              )}
            </>
          )}
        </div>
        {profile.isEmailVerified && (
          <div className="mt-6 text-left">
            {donor ? (
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-bold text-lg text-green-700">
                  🩸 Registered Donor
                </h3>
                <p>
                  <b>Blood Type:</b> {donor.bloodType}
                </p>
                <p>
                  <b>City:</b> {donor.city}
                </p>
                <p>
                  <b>Pincode:</b> {donor.pincode}
                </p>
                <p>
                  <b>Phone Number:</b> {donor.phone}
                </p>
                <p>
                  <b>Availability:</b> {donor.availability}
                </p>
                <p>
                  <b>Visible:</b> {donor.visibility ? "Yes" : "No"}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleDonorSubmit}
                className="p-4 bg-indigo-50 rounded-xl space-y-3"
              >
                <h3 className="font-bold text-lg text-indigo-700">
                  🩸 Register as Donor
                </h3>
                <select
                  name="bloodType"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl"
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Submit
                </button>
                {message && (
                  <p className="mt-2 text-sm text-center text-gray-600">
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
        {editing && (
          <form
            onSubmit={handleUpdateSubmit}
            className="p-4 bg-yellow-50 rounded-xl space-y-3 mt-4"
          >
            <h3 className="font-bold text-lg text-yellow-700">
              ✏️ Edit Donor Details
            </h3>
            <select
              name="bloodType"
              className="w-full p-2 border rounded-xl"
              value={form.bloodType || donor.bloodType}
              onChange={handleChange}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input
              type="text"
              name="city"
              defaultValue={donor.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            />
            <input
              type="text"
              name="pincode"
              defaultValue={donor.pincode}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            />
            <input
              type="number"
              name="phone"
              defaultValue={donor.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            />
            <select
              name="availability"
              defaultValue={donor.availability}
              onChange={handleChange}
              className="w-full p-2 border rounded-xl"
            >
              <option value="AVAILABLE">Available</option>
              <option value="NOT_AVAILABLE">Not Available</option>
            </select>
            <select
              name="visibility"
              defaultValue={donor.visibility}
              onChange={(e) =>
                setForm({ ...form, visibility: e.target.value === "true" })
              }
              className="w-full p-2 border rounded-xl"
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </form>
        )}
        <div className="mt-6">
          <LogoutButton />
        </div>
      </motion.div>
    </div>
  );
}

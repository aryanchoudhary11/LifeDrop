import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { getMe } from "../services/AuthService.js";
import LogoutButton from "../components/Logout.jsx";

export default function Profile() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMe(localStorage.getItem("accessToken"));
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    if (auth?.accessToken) fetchData();
  }, [auth]);

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
            <>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                ✅ Verified
              </span>
              <div>
                <h2>Register as Donar:</h2>
                <form>
                  <input type="text" placeholder="Enter your address" />
                  <input type="number" placeholder="Enter your pincode" />
                  <label htmlFor="BloodGroup">Select Blood Group</label>
                  <select name="BloodGroup">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </form>
              </div>
            </>
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
        <div className="mt-6">
          <LogoutButton />
        </div>
      </motion.div>
    </div>
  );
}

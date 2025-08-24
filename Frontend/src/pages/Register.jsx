import { motion } from "framer-motion";
import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(form);
      setSuccess(data.message || "Registration successful!");
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
      setSuccess("");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-rose-100 to-rose-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-5xl text-center mb-4 text-rose-600 font-[Creepster]">
          🩸LifeDrop
        </h1>
        <h2 className="text-xl font-bold text-center mb-6 text-gray-400">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-rose-400"
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-rose-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-rose-400"
            onChange={handleChange}
          />
          <select
            name="role"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-rose-400"
            onChange={handleChange}
          >
            <option value="DONOR">Donor</option>
            <option value="SEEKER">Seeker</option>
          </select>
          <button
            type="Submit"
            className="w-full rounded-xl bg-rose-500 text-white py-3 font-medium  shadow hover:bg-rose-600 transition-all cursor-pointer"
          >
            Register
          </button>
        </form>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-rose-700"
          >
            ❌ {error}
          </motion.p>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
            >
              <h2 className="text-xl font-semibold text-green-700">
                🎉 Success!
              </h2>
              <p className="mt-2 text-gray-600">{success}</p>

              <button
                onClick={() => navigate("/login")}
                className="mt-4 px-5 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition"
              >
                Login Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

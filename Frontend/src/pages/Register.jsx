import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <form className="space-y-4">
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
      </motion.div>
    </div>
  );
}

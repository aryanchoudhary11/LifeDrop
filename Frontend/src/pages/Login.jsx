import { motion } from "framer-motion";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-indigo-300">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-5xl text-center mb-4 text-rose-600 font-[Creepster]">
          🩸LifeDrop
        </h1>
        <h2 className="text-xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="sumbit"
            className="w-full p-3 bg-indigo-500 rounded-xl text-white font-medium cursor-pointer hover:bg-indigo-600 transition-all"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

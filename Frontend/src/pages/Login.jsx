import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { loginUser } from "../services/AuthService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      localStorage.setItem("accessToken", data.accessToken);
      setAuth({ user: data.user, accessToken: data.accessToken });
      setSuccess("Login successful");
      setError("");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
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
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                onClick={() => navigate("/")}
                className="mt-4 px-5 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition"
              >
                Go to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

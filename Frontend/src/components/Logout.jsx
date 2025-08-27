import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logoutUser } from "../services/AuthService.js";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("accessToken");
    setAuth(null);
    navigate("/login");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleLogout}
      className="px-5 py-2 rounded-xl bg-rose-500 text-white shadow-md hover:bg-rose-600 transition"
    >
      🚪 Logout
    </motion.button>
  );
}

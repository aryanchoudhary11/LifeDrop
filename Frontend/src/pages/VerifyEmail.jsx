import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/AuthService.js";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        const { data } = await verifyEmail(token);
        setStatus("success");
        setMessage(data.message || "Email verified successfully");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };

    verify();
  }, [searchParams, navigate]);

  const getStatusColor = () => {
    if (status === "success") return "text-green-600";
    if (status === "error") return "text-rose-600";
    return "text-gray-600";
  };

  const getEmoji = () => {
    if (status === "success") return "✅";
    if (status === "error") return "❌";
    return "⏳";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      >
        <motion.p
          key={status}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`font-semibold text-lg ${getStatusColor()}`}
        >
          {getEmoji()} {message || "Verifying..."}
        </motion.p>
        {status === "loading" && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

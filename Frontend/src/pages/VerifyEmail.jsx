import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/AuthService.js";

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
        // setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };
    verify();
  }, [searchParams, navigate]);
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {status == "loading" && <p className="text-gray-600">Verifying...</p>}
        {status == "success" && (
          <p className="text-green-600 font-semibold">✅ {message}</p>
        )}
        {status == "error" && (
          <p className="text-rose-600 font-semibold">❌ {message}</p>
        )}
      </div>
    </div>
  );
}

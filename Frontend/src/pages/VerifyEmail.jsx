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
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed");
      }
    };
    verify();
  }, [searchParams, navigate]);
  return (
    <div>
      <div>
        {status == "loading" && <p>Verifying...</p>}
        {status == "success" && <p>✅ {message}</p>}
        {status == "error" && <p>❌ {message}</p>}
      </div>
    </div>
  );
}

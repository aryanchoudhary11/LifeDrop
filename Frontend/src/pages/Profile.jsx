import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { getDonorProfile, getMe } from "../services/AuthService.js";

export default function Profile() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.accessToken) return;
      const { data } = await getMe(auth.accessToken);
      setProfile(data);
      if (data.role === "DONOR") {
        const donor = await getDonorProfile(auth.accessToken);
        setProfile((prev) => ({ ...prev, donor: donor.data }));
      }
    };
    fetchData();
  }, [auth]);
  if (!profile) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2>My Profile</h2>
        <p>
          <span>Name:</span> {profile.name}
        </p>
        <p>
          <span>Email:</span> {profile.email}
        </p>
        <p>
          <span>Role:</span> {profile.role}
        </p>
      </motion.div>
    </div>
  );
}

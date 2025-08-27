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
      if (!auth?.accessToken) return;
      const { data } = await getMe();
      setProfile(data);
      console.log("Profile data:", data);
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
        <LogoutButton />
      </motion.div>
    </div>
  );
}

// src/pages/ProfilePage.jsx
// import { useEffect, useState } from "react";
// import { getMe, getDonorProfile } from "../services/AuthService";
// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";

// export default function ProfilePage() {
//   const { auth } = useAuth();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!auth?.accessToken) return;
//       const { data } = await getMe(auth.accessToken);
//       setProfile(data);
//       if (data.role === "DONOR") {
//         const donor = await getDonorProfile(auth.accessToken);
//         setProfile((prev) => ({ ...prev, donor: donor.data }));
//       }
//     };
//     fetchData();
//   }, [auth]);

//   if (!profile) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-10 bg-gradient-to-br from-green-100 to-green-300 h-screen">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8"
//       >
//         <h2 className="text-2xl font-bold text-green-600 mb-4">My Profile</h2>
//         <p><span className="font-semibold">Name:</span> {profile.name}</p>
//         <p><span className="font-semibold">Email:</span> {profile.email}</p>
//         <p><span className="font-semibold">Role:</span> {profile.role}</p>
//         {profile.donor && (
//           <div className="mt-4">
//             <h3 className="font-bold text-green-500">Donor Info:</h3>
//             <p>Blood Type: {profile.donor.bloodType}</p>
//             <p>City: {profile.donor.location.city}</p>
//             <p>Phone: {profile.donor.contact.phone}</p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function Navbar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/donors", label: "Donors" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuth(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-[Creepster] text-rose-600 drop-shadow-md"
        >
          🩸 LifeDrop
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-rose-600 transition"
            >
              {link.label}
            </Link>
          ))}

          {auth ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-rose-600 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-rose-600 text-white rounded-lg px-3 py-1 hover:bg-rose-700 cursor-pointer transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 text-white rounded-lg px-3 py-1 hover:bg-indigo-700 cursor-pointer transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-rose-600 text-white rounded-lg px-3 py-1 hover:bg-rose-700 cursor-pointer transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

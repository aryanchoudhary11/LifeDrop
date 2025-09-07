import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
          className="text-2xl sm:text-3xl md:text-3xl font-[Creepster] text-rose-600 drop-shadow-md"
        >
          🩸 LifeDrop
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-rose-600 transition text-sm sm:text-base"
            >
              {link.label}
            </Link>
          ))}

          {auth ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-rose-600 transition text-sm sm:text-base"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-rose-600 text-white rounded-lg px-3 py-1 text-sm sm:text-base hover:bg-rose-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-600 text-white rounded-lg px-3 py-1 text-sm sm:text-base hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-rose-600 text-white rounded-lg px-3 py-1 text-sm sm:text-base hover:bg-rose-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-rose-600 transition text-base"
            >
              {link.label}
            </Link>
          ))}

          {auth ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block text-gray-700 hover:text-rose-600 transition text-base"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-indigo-600 text-white rounded-lg px-3 py-2 text-base hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-rose-600 text-white rounded-lg px-3 py-2 text-base hover:bg-rose-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

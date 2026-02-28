import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          Service<span className="text-blue-500">Hub</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-6">
          {/* PUBLIC LINKS - ALWAYS VISIBLE */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          {/* ONLY IF LOGGED IN */}
          {userId && <Link to="/my-bookings">My Bookings</Link>}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-3">
          {!userId ? (
            <>
              <Link
                to="/login"
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col">

          {/* PUBLIC LINKS */}
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {/* ONLY IF LOGGED IN */}
          {userId && (
            <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
              My Bookings
            </Link>
          )}

          {!userId ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="border border-white px-4 py-1 rounded text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 text-black px-4 py-1 rounded text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 px-4 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold">
        Service<span className="text-blue-500">Hub</span>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/services" className="hover:text-blue-400">Services</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        <Link to="/my-bookings">My Bookings</Link>

      </div>

      {/* AUTH BUTTONS */}
      <div className="flex items-center space-x-3">
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
      </div>
    </nav>
  );
};

export default Navbar;

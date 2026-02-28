import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 sm:pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Service<span className="text-blue-500">Hub</span>
          </h2>
          <p className="text-xs sm:text-sm mt-3 text-gray-400 leading-relaxed">
            Reliable bike & car service platform providing quality maintenance,
            expert mechanics, and transparent pricing.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
            Our Services
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>Bike General Service</li>
            <li>Car Full Service</li>
            <li>AC Service</li>
            <li>Engine Repair</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>📍 Chennai, Tamil Nadu</li>
            <li>
              <a
                href="tel:+919876543210"
                className="hover:text-white transition"
              >
                📞 +91 98765 43210
              </a>
            </li>
            <li>
              <a
                href="mailto:support@servicehub.com"
                className="hover:text-white transition"
              >
                ✉ support@servicehub.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 text-center text-xs sm:text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
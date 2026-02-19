const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Service<span className="text-blue-500">Hub</span>
          </h2>
          <p className="text-sm mt-3 text-gray-400">
            Reliable bike & car service platform providing quality maintenance,
            expert mechanics, and transparent pricing.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Services</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Bike General Service</li>
            <li>Car Full Service</li>
            <li>AC Service</li>
            <li>Engine Repair</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Chennai, Tamil Nadu</li>
            <li>📞 +91 98765 43210</li>
            <li>✉ support@servicehub.com</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2026 ServiceHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700"
  }`;

const AdminSidebar = () => {
  const location = useLocation();
  const [openServices, setOpenServices] = useState(false);

  // Auto open dropdown when inside services route
  useEffect(() => {
    if (location.pathname.includes("/admin/services")) {
      setOpenServices(true);
    }
  }, [location]);

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0b1220] to-[#020617] p-4">
      <h2 className="text-white text-xl font-bold mb-6">
        Admin Panel
      </h2>

      <nav className="space-y-2">

        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/carousel" className={linkClass}>
          Carousel
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          Bookings
        </NavLink>

        {/* 🔥 SERVICES DROPDOWN */}
        <div>
          <button
            onClick={() => setOpenServices(!openServices)}
            className={`w-full text-left px-4 py-2 rounded text-gray-300 hover:bg-gray-700 flex justify-between items-center ${
              location.pathname.includes("/admin/services")
                ? "bg-gray-700 text-white"
                : ""
            }`}
          >
            Services
            <span
              className={`transition-transform ${
                openServices ? "rotate-90" : ""
              }`}
            >
              
            </span>
          </button>

          {openServices && (
            <div className="ml-4 mt-2 space-y-1">
              <NavLink
                to="/admin/services/bike"
                className={linkClass}
              >
                Bike Services
              </NavLink>

              <NavLink
                to="/admin/services/car"
                className={linkClass}
              >
                Car Services
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          Messages
        </NavLink>

        <NavLink to="/admin/achievements" className={linkClass}>
          Achievements
        </NavLink>

        <NavLink to="/admin/packages" className={linkClass}>
          Packages
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;

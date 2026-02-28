import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const linkClass = ({ isActive }) =>
  `block px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700"
  }`;

const AdminSidebar = () => {
  const location = useLocation();
  const [openServices, setOpenServices] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/admin/services")) {
      setOpenServices(true);
    }
  }, [location]);

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-[#0b1220] to-[#020617] p-4 md:min-h-screen">
      
      <h2 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Admin Panel
      </h2>

      <nav className="space-y-1 sm:space-y-2">

        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/carousel" className={linkClass}>
          Carousel
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          Bookings
        </NavLink>

        {/* SERVICES DROPDOWN */}
        <div>
          <button
            onClick={() => setOpenServices(!openServices)}
            className={`w-full text-left px-3 sm:px-4 py-2 rounded text-sm sm:text-base text-gray-300 hover:bg-gray-700 flex justify-between items-center ${
              location.pathname.includes("/admin/services")
                ? "bg-gray-700 text-white"
                : ""
            }`}
          >
            Services
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

        <NavLink to="/admin/messages" className={linkClass}>
          Messages
        </NavLink>

        <NavLink to="/admin/achievements" className={linkClass}>
          Achievements
        </NavLink>

        <NavLink to="/admin/packages" className={linkClass}>
          Packages
        </NavLink>

        {/* ✅ NEW LINK */}
        

      </nav>
    </aside>
  );
};

export default AdminSidebar;
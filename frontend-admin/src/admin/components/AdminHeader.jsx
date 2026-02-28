import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleChangePassword = () => {
    navigate("/admin/change-password");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow relative">
      <h1 className="font-bold text-lg">Admin Panel</h1>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer font-bold"
        >
          A
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
            <button
              onClick={handleChangePassword}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
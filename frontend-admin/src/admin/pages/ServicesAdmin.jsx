import { Link } from "react-router-dom";

const ServicesAdmin = () => {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Manage Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link
          to="/admin/services/bike"
          className="p-5 sm:p-6 bg-white shadow rounded hover:bg-slate-100 text-sm sm:text-base"
        >
          🚲 Bike Services
        </Link>

        <Link
          to="/admin/services/car"
          className="p-5 sm:p-6 bg-white shadow rounded hover:bg-slate-100 text-sm sm:text-base"
        >
          🚗 Car Services
        </Link>
      </div>
    </div>
  );
};

export default ServicesAdmin;
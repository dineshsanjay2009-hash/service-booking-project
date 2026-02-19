import { Link } from "react-router-dom";

const ServicesAdmin = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/admin/services/bike"
          className="p-6 bg-white shadow rounded hover:bg-slate-100"
        >
          🚲 Bike Services
        </Link>

        <Link
          to="/admin/services/car"
          className="p-6 bg-white shadow rounded hover:bg-slate-100"
        >
          🚗 Car Services
        </Link>
      </div>
    </div>
  );
};

export default ServicesAdmin;

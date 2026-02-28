import { Link } from "react-router-dom";

const AdminNotFound = () => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="mt-3 text-gray-600">
          Admin Page Not Found
        </p>
        <Link
          to="/admin/dashboard"
          className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminNotFound;
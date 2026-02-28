import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        await api.get("/dashboard/stats"); // test protected API
        setAuthorized(true);
      } catch {
        setAuthorized(false);
        localStorage.removeItem("adminToken");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
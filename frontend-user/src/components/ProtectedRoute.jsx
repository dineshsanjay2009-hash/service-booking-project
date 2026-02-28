import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const location = useLocation(); // 🔥 IMPORTANT

  if (!userId) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, service: location.state?.service }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
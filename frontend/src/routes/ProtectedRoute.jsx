import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/secure" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
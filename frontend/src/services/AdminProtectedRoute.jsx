import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const isLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
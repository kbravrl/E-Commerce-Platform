import { Navigate, Outlet } from "react-router-dom";

const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ redirectPath = "/" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

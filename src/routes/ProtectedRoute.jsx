import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Use Redux state instead of AuthContext!
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their specific dashboard if access is denied
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
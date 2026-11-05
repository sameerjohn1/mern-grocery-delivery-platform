import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { storeRedirect } from "../../auth/authStorage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const redirectPath = `${location.pathname}${location.search}`;

  if (!isAuthenticated) {
    storeRedirect(redirectPath);
    return (
      <Navigate to="/login" replace state={{ from: redirectPath }} />
    );
  }

  return children;
};

export default ProtectedRoute;

// Packages
import { useLocation, Navigate, Outlet } from "react-router-dom";

// Store
import { useStore } from "../store";

const ProtectedRoutes = () => {
  const auth = useStore((state) => state.auth);
  const location = useLocation();

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export { ProtectedRoutes };

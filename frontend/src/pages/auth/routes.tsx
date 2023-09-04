// Packages
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import { AuthDashboard } from "./components/Dashboard/AuthDashboard";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";

// Store
import { useStore } from "../../shared/store";

const AuthRoutes = () => {
  const auth = useStore((state) => state.auth);

  const location = useLocation();
  const navigatedFrom = location.state?.from?.pathname || "/chat";

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.user ? <Navigate to={navigatedFrom} /> : <AuthDashboard />
        }
      >
        <Route path="signin" element={<SignInForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
};

export { AuthRoutes };

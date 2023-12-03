// Packages
import { useNavigate, useLocation } from "react-router-dom";

// Components
import { ProfileIcon } from "../ProfileIcon";

// Store
import { useStore } from "../../../../shared/store";

const ProfileLink = () => {
  const auth = useStore((state) => state.auth);
  const { user } = auth;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="hidden md:flex items-center justify-center gap-3 text-2xl cursor-pointer hover:scale-105 active:scale-100 transition"
      title="Profile"
      onClick={() => navigate("/user/profile", { state: { from: location } })}
    >
      <ProfileIcon />
      <h3>{user?.username}</h3>
    </div>
  );
};

export { ProfileLink };

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Store
import { useStore } from "../../../../shared/store";

// Assets
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ProfileIcon = () => {
  const auth = useStore((state) => state.auth);
  const { user } = auth;

  return (
    <span className="border-2 border-pink rounded-full w-7 h-7 md:w-10 md:h-10 grid place-items-center">
      {user?.profileImage ? (
        <img src={user.profileImage} alt={user.username} className="w-full" />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} size="lg" />
      )}
    </span>
  );
};

export { ProfileIcon };

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Store
import { useStore } from "../../../shared/store";

// Assets
import { UserCircleIcon } from "../../../assets/icons/icons";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ProfileIcon = () => {
  const auth = useStore((state) => state.auth);
  const { user } = auth;

  return (
    <span className="border-2 border-pink rounded-full w-7 h-7 md:w-10 md:h-10 grid place-items-center overflow-hidden">
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt={user.username}
          className="w-full object-cover"
        />
      ) : (
        <UserCircleIcon />
      )}
    </span>
  );
};

export { ProfileIcon };

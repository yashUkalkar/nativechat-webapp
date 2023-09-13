// Packages
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Store
import { useStore } from "../../../../shared/store";

// Assets
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const SignoutButton = ({
  showOnSmallScreens,
}: {
  showOnSmallScreens?: boolean;
}) => {
  const clearAuth = useStore((state) => state.clearAuth);

  const navigate = useNavigate();

  return (
    <button
      className={
        "items-center justify-between gap-2 text-lg font-medium hover:scale-105 active:scale-100 transition relative after:w-full after:h-[2px] after:bg-pink after:absolute after:bottom-[-5px] lg:after:bottom-0 after:left-0 after:scale-0 hover:after:scale-100 active:after:bg-dark-blue after:transition" +
        (showOnSmallScreens ? " flex md:hidden" : " hidden md:flex")
      }
      title="Sign Out!"
      onClick={() => {
        clearAuth();
        navigate("/");
      }}
    >
      <p className={showOnSmallScreens ? "" : " hidden lg:inline-block"}>
        Sign Out
      </p>
      <FontAwesomeIcon icon={faPowerOff} />
    </button>
  );
};

export { SignoutButton };

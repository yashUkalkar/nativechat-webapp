// Packages
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import { faExclamationCircle, faHome } from "@fortawesome/free-solid-svg-icons";

const Custom404Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const directedFrom = location.state?.from?.pathname || "/";

  return (
    <div className="w-screen h-screen min-h-screen overflow-x-hidden grid place-items-center">
      <div className="bg-white bg-opacity-70 backdrop-blur-[5px] rounded-lg p-4 md:p-7">
        <span className="flex items-center justify-around gap-4 font-bold text-2xl md:text-3xl m-5">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <p>Page not available</p>
        </span>

        <span
          className="flex items-center justify-center gap-3 font-medium text-xl m-5 hover:scale-105 transition active:scale-100 cursor-pointer"
          onClick={() => navigate(directedFrom, { replace: true })}
        >
          <p className="text-pink">Go back</p>
          <FontAwesomeIcon icon={faHome} />
        </span>
      </div>
    </div>
  );
};

export { Custom404Page };

// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Store
import { useStore } from "../../shared/store";

// Assets
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ErrorComponent = () => {
  const errorState = useStore((state) => state.errorState);
  const removeError = useStore((state) => state.removeError);

  return errorState.visible ? (
    <div className="bg-error fixed top-0 left-0 w-screen z-10 selection:bg-white selection:text-dark-blue">
      <div className="w-full h-full relative p-3">
        <p className="text-center text-white font-semibold md:text-xl mr-5">
          {errorState.message}
        </p>

        <span
          className="w-5 h-5 bg-white rounded-full grid place-items-center absolute right-2 top-1/2 -translate-y-1/2 hover:scale-110 cursor-pointer"
          onClick={removeError}
        >
          <FontAwesomeIcon icon={faClose} size="lg" />
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export { ErrorComponent };

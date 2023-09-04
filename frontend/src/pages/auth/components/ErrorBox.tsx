// Packages
import { FieldError } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

interface PropType {
  errorState: FieldError | undefined;
  errorMessage: string;
}
const ErrorBox = (props: PropType) => {
  return (
    props.errorState && (
      <div className="bg-error rounded-xl flex items-center w-full max-w-[340px] px-2 py-1 gap-3 justify-between">
        <span className="bg-white rounded-full w-6 h-6 grid place-items-center flex-shrink-0">
          <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
        </span>
        <p className="text-white font-medium text-sm lg:text-base">
          {props.errorMessage}
        </p>
      </div>
    )
  );
};

export { ErrorBox };

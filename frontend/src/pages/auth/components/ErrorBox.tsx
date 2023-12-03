// Packages
import { FieldError } from "react-hook-form";

// // Assets
// import { ErrorIcon } from "../../../assets/icons/icons";

interface PropType {
  errorState: FieldError | undefined;
  errorMessage: string;
}
const ErrorBox = (props: PropType) => {
  return (
    props.errorState && (
      <div>
        {/* <span className="bg-white rounded-full w-6 h-6 grid place-items-center flex-shrink-0">
          <ErrorIcon />
        </span> */}
        <p className="text-error font-semibold text-sm lg:text-base">
          {props.errorMessage}
        </p>
      </div>
    )
  );
};

export { ErrorBox };

// Components
import { ErrorBox } from "./ErrorBox";

// Type
import { FieldError } from "react-hook-form";

interface PropType {
  label: string;
  isPasswordField?: boolean;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  icon?: JSX.Element;
  errorState: FieldError | undefined;
  errorMessage: string;
}
const InputField = (props: PropType) => {
  return (
    <div className="flex flex-col gap-1 w-full min-w-[340px] max-w-[380px] hover:scale-105 transition">
      <label
        className="font-medium flex items-center justify-between"
        htmlFor={props.inputAttributes?.name}
      >
        <h4>{props.label} :</h4>
        <div className="flex items-center justify-between gap-4">
          {props.icon}
        </div>
      </label>
      <input
        className="outline-none bg-transparent border-b-[1.3px] border-dark-blue focus:border-pink focus:placeholder:text-pink placeholder:opacity-70 transition"
        {...props.inputAttributes}
      />
      <ErrorBox
        errorState={props.errorState}
        errorMessage={props.errorMessage}
      />
    </div>
  );
};

export { InputField };

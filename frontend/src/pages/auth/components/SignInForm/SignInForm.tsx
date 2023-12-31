// Packages
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import { InputField } from "../InputField";
import { SubmitButton } from "../SubmitButton";

// Services
import { sendAuthRequest } from "../../services/authRequests";

// Store
import { useStore } from "../../../../shared/store";

// Types
import { SignInDataType } from "../../types/authTypes";

// Assets
import { UserIcon, LockIcon } from "../../../../assets/icons/icons";

const SignInForm = () => {
  const showError = useStore((state) => state.showError);
  const removeError = useStore((state) => state.removeError);

  const setAuth = useStore((state) => state.setAuth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInDataType>({ mode: "all" });

  const submitHandler: SubmitHandler<SignInDataType> = async (data) => {
    try {
      await sendAuthRequest("/auth/signin", data).then((responseData) => {
        const { accessToken, ...userData } = responseData;
        setAuth(userData, accessToken);
        navigate("/chat", { replace: true });
      });
    } catch (error) {
      if (error instanceof Error) {
        removeError();
        showError(error.message);
      }
    } finally {
      setTimeout(() => {
        removeError();
      }, 7000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white bg-opacity-70 backdrop-blur-[5px] mt-5 flex flex-col items-center gap-10 w-full min-w-[340px] sm:max-w-[400px] p-3 sm:rounded-2xl h-full place-content-center sm:h-fit"
    >
      <h2 className="text-2xl md-7 font-semibold text-center">Sign In</h2>

      {/* <div>
        <InputField
          label="Email"
          inputAttributes={{
            ...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            }),
            type: "email",
            placeholder: "example@mail.com",
            autoComplete: "off",
          }}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          errorState={errors.email}
          errorMessage="Required field! Format: 'abc@xyz.com'"
        />
      </div> */}

      <div>
        <InputField
          label="Username"
          inputAttributes={{
            ...register("username", {
              required: true,
              minLength: 3,
              maxLength: 30,
            }),
            type: "text",
            placeholder: "sampleUsername",
            autoComplete: "off",
          }}
          icon={<UserIcon />}
          errorState={errors.username}
          errorMessage="!Required field. Format: '3 <= length <= 30'"
        />
        {/* {errors?.username && (
          <p className="text-error font-medium">
            !Required field. {"Format: '3 <= length <= 30'"}
          </p>
        )} */}
      </div>

      <div>
        <InputField
          isPasswordField
          label="Password"
          inputAttributes={{
            ...register("password", {
              required: true,
              minLength: 7,
              maxLength: 20,
            }),
            type: "password",
            placeholder: "Samplepassword@123",
            autoComplete: "off",
          }}
          icon={<LockIcon />}
          errorState={errors.password}
          errorMessage="Required Field! Format: '7 <= length <= 20'"
        />
        {/* {errors?.password && (
          <p className="text-error font-medium">
            !Required field. {"Format: '7 <= length <= 20'"}
          </p>
        )} */}
      </div>

      <SubmitButton disabled={!isValid} text="Sign In" />

      <span className="text-center">
        Don't have an account yet?
        <Link
          className="text-pink underline ml-2 hover:scale-105 transition"
          to="/auth/signup"
        >
          Sign Up here!
        </Link>
      </span>
    </form>
  );
};

export { SignInForm };

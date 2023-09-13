import { UserDataType } from "../../../shared/types";

type SignUpDataType = {
  username: string;
  password: string;
  confirmPassword: string;
};
type SignInDataType = {
  username: string;
  password: string;
};

interface AuthResponseType extends UserDataType {
  accessToken: string;
}

export type { SignInDataType, SignUpDataType, AuthResponseType };

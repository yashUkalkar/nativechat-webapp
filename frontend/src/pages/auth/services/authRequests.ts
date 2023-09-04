// Packages
import { AxiosError } from "axios";

// Services
import { server } from "../../../shared/services/api";

// Utils
import { getErrorMessage } from "../utils/errorMessageHandler";

// Types
import { AuthResponseType } from "../../../shared/types";
import { SignInDataType, SignUpDataType } from "../types/authTypes";

const sendAuthRequest = async (
  requestPath: string,
  data: SignInDataType | SignUpDataType
): Promise<AuthResponseType> => {
  const controller = new AbortController();

  return await server
    .post<AuthResponseType>(requestPath, data, { signal: controller.signal })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw new Error(getErrorMessage(error));
    })
    .finally(() => controller.abort());
};

export { sendAuthRequest };

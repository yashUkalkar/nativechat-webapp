import { AxiosError } from "axios";

const isString = (value: unknown) =>
  typeof value === "string" || value instanceof String;

const getErrorMessage = (error: AxiosError): string => {
  if (error.response && isString(error.response.data))
    return `${error.response.data}`;
  if (error.code === "ERR_NETWORK") return "Unable to connect to server!";
  else return "Some unknown error occured!";
};

export { getErrorMessage };

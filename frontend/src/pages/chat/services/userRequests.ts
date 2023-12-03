// Types
import { AxiosInstance } from "axios";
import { ConversationUserType } from "../types";

const getUsersByUsernameMatch = async (
  axiosPrivate: AxiosInstance,
  username: string
) => {
  try {
    const usersList = await axiosPrivate.get<ConversationUserType[]>(
      "/users/getUsers",
      {
        params: {
          username,
        },
      }
    );
    return usersList.data;
  } catch (error) {
    throw new Error("Unable to fetch users!");
  }
};

export { getUsersByUsernameMatch };

// Types
import { AxiosInstance, AxiosError } from "axios";
import { ConversationType } from "../types";

const getAllConversations = async (axiosPrivate: AxiosInstance) => {
  try {
    const conversations = await axiosPrivate.get("/conversations");
    return conversations.data;
  } catch (err) {
    throw new Error("Unable to get your chats.");
  }
};

const createNewConversation = async (
  axiosPrivate: AxiosInstance,
  conversationUserID: string
) => {
  try {
    const conversation = await axiosPrivate.post<ConversationType>(
      "/conversations",
      { conversationUserID }
    );

    return conversation.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data);
    } else {
      throw new Error("Unknown error occurred! Unable to create conversation.");
    }
  }
};

export { getAllConversations, createNewConversation };

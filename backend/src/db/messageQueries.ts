// Prisma instance
import { prisma } from "./prisma";

// Types
import { CustomError, MessageType } from "../types";

const getAllConversationMessages = async (
  conversationID: string
): Promise<MessageType[]> => {
  try {
    const conversationMessages: MessageType[] = await prisma.messages.findMany({
      where: { conversationID },
      orderBy: { sentAt: "asc" },
    });

    return conversationMessages;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your messages",
    };
    throw customError;
  }
};

const addNewConversationMessage = async (
  conversationID: string,
  message: string,
  senderID: string
) => {
  try {
    const messageRecord: MessageType = await prisma.messages.create({
      data: {
        conversationID,
        content: message,
        senderID,
      },
    });

    return messageRecord;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to send your message!",
    };
    throw customError;
  }
};

const getMessage = async (messageID: string) => {
  try {
    const message = await prisma.messages.findFirst({
      where: {
        id: messageID,
      },
    });

    return message;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your message!",
    };
    throw customError;
  }
};

const deleteMessage = async (messageID: string) => {
  try {
    return await prisma.messages.delete({
      where: {
        id: messageID,
      },
    });
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to delete your message!",
    };
    throw customError;
  }
};

export const messageQueries = {
  getAllConversationMessages,
  addNewConversationMessage,
  getMessage,
  deleteMessage,
};

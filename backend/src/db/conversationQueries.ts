// Prisma instance
import { prisma } from "./prisma";

// Types
import { ConversationsList, CustomError } from "../types";

const getUserConversations = async (id: string) => {
  try {
    const conversations: ConversationsList =
      await prisma.conversations.findMany({
        where: {
          users: {
            some: { id },
          },
        },
        include: {
          users: {
            where: {
              NOT: { id },
            },
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
        },
      });

    return conversations;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your chats",
    };
    throw customError;
  }
};

const checkIfConversationExists = async (
  user1_ID: string,
  user2_ID: string
): Promise<boolean> => {
  try {
    const conversationExists = await prisma.conversations.findFirst({
      where: {
        AND: [
          { users: { some: { id: user1_ID } } },
          { users: { some: { id: user2_ID } } },
        ],
      },
    });

    return conversationExists !== null;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your chats",
    };
    throw customError;
  }
};

const createNewConversation = async (user1_ID: string, user2_ID: string) => {
  try {
    const conversation = await prisma.conversations.create({
      data: {
        users: {
          connect: [{ id: user1_ID }, { id: user2_ID }],
        },
      },
    });

    return conversation;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your chats",
    };
    throw customError;
  }
};

const checkIfConversationExistsByID = async (
  conversationID: string
): Promise<boolean> => {
  try {
    const conversationExists = await prisma.conversations.findFirst({
      where: { id: conversationID },
    });

    return conversationExists !== null;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your chats",
    };
    throw customError;
  }
};

const deleteConversation = async (conversationID: string) => {
  try {
    await prisma.conversations.delete({
      where: {
        id: conversationID,
      },
    });
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to fetch your chats",
    };
    throw customError;
  }
};

export const conversationQueries = {
  getUserConversations,
  checkIfConversationExists,
  checkIfConversationExistsByID,
  createNewConversation,
  deleteConversation,
};

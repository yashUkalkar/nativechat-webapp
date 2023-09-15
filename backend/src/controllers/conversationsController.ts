// Packages
import { prisma } from "../db/prisma";

// Types
import { Response } from "express";
import {
  RequestTypeWithJWT,
  ExtendedJwtPayload,
  ConversationType,
  ConversationsList,
} from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const getAllConversations = async (req: RequestTypeWithJWT, res: Response) => {
  const userID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;
  try {
    const conversations: ConversationsList =
      await prisma.conversations.findMany({
        where: {
          users: {
            some: {
              id: userID,
            },
          },
        },
        include: {
          users: {
            where: {
              NOT: {
                id: userID,
              },
            },
            select: {
              id: true,
              username: true,
              profileImage: true,
            },
          },
        },
      });

    return res.status(200).send(conversations);
  } catch (err) {
    return res.status(500).send("Unable to fetch your chats.");
  }
};

const addNewConversation = async (req: RequestTypeWithJWT, res: Response) => {
  const userID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;
  const { conversationUserID }: { conversationUserID: string } = req.body;

  try {
    //* Check if given user exists
    const userData = await prisma.users.findFirst({
      where: { id: conversationUserID },
      select: { id: true, username: true, profileImage: true },
    });
    if (!userData) return res.status(404).send("User not found");

    //* Check if a conversation between the users already exists
    const existingConversation = await prisma.conversations.findFirst({
      where: {
        AND: [
          {
            users: { some: { id: userID } },
          },
          { users: { some: { id: conversationUserID } } },
        ],
      },
    });

    if (existingConversation)
      return res
        .status(409)
        .send("Conversation already exists. Please check your chats");

    //* Create conversation
    const conversation = await prisma.conversations.create({
      data: {
        users: {
          connect: [{ id: userID }, { id: conversationUserID }],
        },
      },
    });

    //* Respond with conversation ID, other user's username, profileImage
    const responseData: ConversationType = {
      id: conversation.id,
      user: {
        id: userData.id,
        username: userData.username,
        profileImage: userData.profileImage,
      },
    };
    return res.status(201).send(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to create conversation");
  }
};

const deleteConversation = async (req: RequestTypeWithJWT, res: Response) => {
  const { conversationID } = req.body;

  try {
    await prisma.conversations.delete({
      where: {
        id: conversationID,
      },
    });
    return res.status(204).send("Conversation deleted");
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).send("Conversation to delete does not exist.");
      }
    }
    return res.status(500).send("Unable to delete the conversation.");
  }
};

export const conversationsController = {
  getAllConversations,
  addNewConversation,
  deleteConversation,
};

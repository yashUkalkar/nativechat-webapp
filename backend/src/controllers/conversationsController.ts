// DB
import { db } from "../db";

// Types
import { Response } from "express";
import {
  RequestTypeWithJWT,
  ExtendedJwtPayload,
  ConversationType,
  ConversationsList,
  CustomError,
} from "../types";

const getAllConversations = async (req: RequestTypeWithJWT, res: Response) => {
  const userID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;
  try {
    if (userID) {
      //* Fetch all conversations
      const conversations: ConversationsList =
        await db.conversationQueries.getUserConversations(userID);

      //! This query will always return an array for the 'users' field which we do not need so we need to create a new array where the 'users' field is only a single object
      const modifiedConversationsList = conversations.map((conversation) => {
        const newConversationType = {
          id: conversation.id,
          user: conversation.users[0],
        };
        return newConversationType;
      });

      //* Respond with the conversations list
      return res.send(modifiedConversationsList);
    } else {
      // Some error occurred. Parsed 'userID' is empty
      const customError: CustomError = {
        code: 500,
        message: "Unknown error occurred. Unable to fetch your conversations",
      };
      throw customError;
    }
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const addNewConversation = async (req: RequestTypeWithJWT, res: Response) => {
  const userID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;
  const { conversationUserID }: { conversationUserID: string } = req.body;

  try {
    //* Check if given user exists
    const userData = await db.authQueries.getUserByID(conversationUserID);
    if (userData && userID) {
      //* Check if a conversation between the users already exists
      const conversationExists =
        await db.conversationQueries.checkIfConversationExists(
          userID,
          userData.id
        );
      if (conversationExists)
        return res.status(409).send("Conversation with user already exists");

      //* Create new conversation in DB
      const conversation = await db.conversationQueries.createNewConversation(
        userID,
        userData.id
      );

      //* Return conversation as response
      const conversationToReturn: ConversationType = {
        id: conversation.id,
        user: {
          id: userData.id,
          username: userData.username,
          profileImage: userData.profileImage,
        },
      };
      return res.status(201).json(conversationToReturn);
    } else {
      // Some error occurred. Parsed 'userID' is empty
      const customError: CustomError = {
        code: 500,
        message: "Unknown error occurred. Unable to fetch your conversations",
      };
      throw customError;
    }
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const deleteConversation = async (req: RequestTypeWithJWT, res: Response) => {
  const { conversationID } = req.body;

  try {
    //* Check if conversation exists
    const conversationExists =
      await db.conversationQueries.checkIfConversationExistsByID(
        conversationID
      );
    if (!conversationExists) {
      const noConversationError: CustomError = {
        code: 404,
        message: "Conversation you are trying to delete does not exist",
      };
      throw noConversationError;
    }

    //* Delete the conversation
    await db.conversationQueries.deleteConversation(conversationID);
    res.sendStatus(204); // Success, No content to respond with.
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

export const conversationsController = {
  getAllConversations,
  addNewConversation,
  deleteConversation,
};

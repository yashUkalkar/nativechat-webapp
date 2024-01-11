// DB
import { db } from "../db";

// Types
import { Response } from "express";
import { RequestTypeWithJWT, CustomError, ExtendedJwtPayload } from "../types";

const getAllConversationMessages = async (
  req: RequestTypeWithJWT,
  res: Response
) => {
  const { conversationID } = req.body;

  if (!conversationID) {
    const emptySearchError: CustomError = {
      code: 400,
      message: "Conversation needs to be specified to fetch messages!",
    };
    throw emptySearchError;
  }
  try {
    const conversationMessages =
      await db.messageQueries.getAllConversationMessages(conversationID);

    return res.send(conversationMessages);
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const addNewMessage = async (req: RequestTypeWithJWT, res: Response) => {
  const { conversationID, message } = req.body;
  const senderID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;

  if (!conversationID) {
    const emptySearchError: CustomError = {
      code: 400,
      message: "Conversation needs to be specified to add messages!",
    };
    throw emptySearchError;
  } else if (!senderID) {
    const unknownError: CustomError = {
      code: 400,
      message: "Sorry, some error occurred at our servers!",
    };
    throw unknownError;
  } else if (!message) {
    const emptyMessageError: CustomError = {
      code: 400,
      message: "Empty message cannot be added!",
    };
    throw emptyMessageError;
  }

  try {
    const resMessage = await db.messageQueries.addNewConversationMessage(
      conversationID,
      message,
      senderID
    );

    return res.send(resMessage);
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const deleteMessage = async (req: RequestTypeWithJWT, res: Response) => {
  const { messageID } = req.body;
  const senderID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;

  console.log("Message ID =", messageID);

  try {
    if (!messageID) {
      const emptyMessageError: CustomError = {
        code: 400,
        message: "Message ID must be provided to delete a message.",
      };
      throw emptyMessageError;
    } else if (!senderID) {
      const unknownError: CustomError = {
        code: 400,
        message: "Sorry, some error occurred at our servers!",
      };
      throw unknownError;
    }

    //TODO: check if message sender is same as the request sender
    const message = await db.messageQueries.getMessage(messageID);
    if (!message) {
      const messageNotFoundError: CustomError = {
        code: 404,
        message: "Message you are trying to delete does not exist.",
      };
      throw messageNotFoundError;
    }

    //! If requester is not sender of message, request is invalid
    if (message.senderID != senderID) {
      const invalidOperationError: CustomError = {
        code: 401,
        message: "Unauthorized!",
      };
      throw invalidOperationError;
    }

    await db.messageQueries.deleteMessage(messageID);
    return res.status(204).send("Message deleted successfully!");
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

export const messagesController = {
  getAllConversationMessages,
  addNewMessage,
  deleteMessage,
};

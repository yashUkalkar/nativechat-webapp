// DB
import { db } from "../db";

// Types
import { Response } from "express";
import { CustomError, RequestTypeWithJWT, ExtendedJwtPayload } from "../types";

const getUsersByMatchingUsername = async (
  req: RequestTypeWithJWT,
  res: Response
) => {
  const { username } = req.query;
  const requesterUserID = (<ExtendedJwtPayload>req.userDataFromToken)?.id;

  //* Check for empty values
  if (!requesterUserID) {
    const unknownError: CustomError = {
      code: 500,
      message: "Some error occurred on the Server",
    };
    throw unknownError;
  }
  if (!username) {
    const emptySearchError: CustomError = {
      code: 400,
      message: "Empty search cannot be performed",
    };
    throw emptySearchError;
  }

  try {
    //* Fetch users with given 'username' parameter
    const usersList = await db.userQueries.findUsersByUsername(
      username.toString(),
      requesterUserID
    );

    //* Respond with users list that match given 'username' parameter
    return res.status(200).send(usersList);
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

export const userController = { getUsersByMatchingUsername };

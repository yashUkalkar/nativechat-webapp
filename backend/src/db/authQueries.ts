// Prisma instance
import { prisma } from "./prisma";

// Types
import { CustomError, UserType } from "../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const getUserByID = async (id: string): Promise<UserType> => {
  try {
    const userData = await prisma.users.findFirstOrThrow({
      where: { id },
    });

    return userData;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // No user found
        const customError: CustomError = {
          code: 400,
          message: "No user with given ID found",
        };
        throw customError;
      }
    }

    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred",
    };
    throw customError;
  }
};

const getUserByUsername = async (username: string): Promise<UserType> => {
  try {
    const userData = await prisma.users.findFirstOrThrow({
      where: { username },
    });

    return userData;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // No user found
        const customError: CustomError = {
          code: 404,
          message: `No user with username '${username}' found. Try signing up for an account!`,
        };
        throw customError;
      }
    }

    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred",
    };
    throw customError;
  }
};

const checkIfUserExists = async (username: string): Promise<boolean> => {
  try {
    const user = await prisma.users.findFirst({ where: { username } });

    return user ? true : false;
  } catch (error) {
    // Some unknown error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred",
    };
    throw customError;
  }
};

type UserSafeReturnType = Omit<UserType, "passwordHash" | "refreshToken">;
const addNewUser = async (
  username: string,
  passwordHash: string
): Promise<UserSafeReturnType> => {
  try {
    const userData = await prisma.users.create({
      data: {
        username,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
        autoTranslate: true,
        translationLanguage: true,
      },
    });

    return userData;
  } catch (error) {
    const customError: CustomError = {
      code: 500,
      message: "Unknown error occurred. Unable to create your account",
    };
    throw customError;
  }
};

const updateRefreshToken = async (userID: string, refreshToken: string) => {
  try {
    await prisma.users.update({
      where: {
        id: userID,
      },
      data: {
        refreshToken,
      },
    });

    return;
  } catch (error) {
    const customError: CustomError = {
      code: 500,
      message: "Some unknown error occurred",
    };
    throw customError;
  }
};

export const authQueries = {
  getUserByID,
  getUserByUsername,
  checkIfUserExists,
  addNewUser,
  updateRefreshToken,
};

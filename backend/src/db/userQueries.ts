// Prisma instance
import { prisma } from "./prisma";

// Types
import { CustomError } from "../types";

const findUsersByUsername = async (
  username: string,
  requesterUserID: string
) => {
  try {
    const usersList = await prisma.users.findMany({
      where: {
        AND: [
          {
            username: { contains: username },
          },
          {
            NOT: { id: requesterUserID },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
      },
    });

    return usersList;
  } catch (error) {
    // Some error occurred
    const customError: CustomError = {
      code: 500,
      message: "Unknown error. Unable to search",
    };
    throw customError;
  }
};

export const userQueries = {
  findUsersByUsername,
};

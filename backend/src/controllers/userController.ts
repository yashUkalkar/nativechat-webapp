// DB
import { prisma } from "../db/prisma";

// Types
import { Response } from "express";
import { RequestTypeWithJWT } from "../types";

const getUsersByMatchingUsername = async (
  req: RequestTypeWithJWT,
  res: Response
) => {
  // FIXME: Empty body is given with request, fix that
  const { username } = req.body;

  if (!username)
    return res.status(400).send("Empty search cannot be performed.");

  try {
    const usersList = await prisma.users.findMany({
      where: {
        username: { contains: username },
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
      },
    });

    return res.status(200).send(usersList);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to search for users. Sorry!");
  }
};

export const userController = { getUsersByMatchingUsername };

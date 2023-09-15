// Packages
import { JwtPayload, VerifyErrors, verify } from "jsonwebtoken";
import { Request, Response, CookieOptions } from "express";

// DB object
import { prisma } from "../db/prisma";

// Utils
import { matchPassword, hashPassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

// Types
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const JwtCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const signInUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  //* Check if data is given with request
  if (!username || !password)
    return res.status(400).send("Invalid credentials");

  //* Check if user exists
  return await prisma.users
    .findFirstOrThrow({ where: { username } })
    .then(async (userData) => {
      //* Match passwords
      const match = await matchPassword(password, userData.passwordHash);

      if (!match)
        return res.status(401).send("Wrong password. Please try again!");

      //* Generate JWTs
      const payload = { id: userData.id };
      const userAccessToken = generateAccessToken(payload);
      const userRefreshToken = generateRefreshToken(payload);

      //* Update refresh token in db
      await prisma.users
        .update({
          where: { username },
          data: { refreshToken: userRefreshToken },
        })
        .catch((err) => {
          return res.sendStatus(500); // Unexpected error
        });

      //* Add refresh token as cookie
      res.cookie("jwt", userRefreshToken, JwtCookieOptions);

      //* Return required user data as response
      const { passwordHash, refreshToken, ...userDataToReturn } = userData;
      return res
        .status(200)
        .send({ ...userDataToReturn, accessToken: userAccessToken });
    })
    .catch((err: PrismaClientKnownRequestError) => {
      if (err.code === "P2025")
        return res
          .status(404)
          .send(
            `No account with username '${username}' found. Try signing up!`
          );
      else return res.sendStatus(500);
    });
};

const signUpUser = async (req: Request, res: Response) => {
  const { username, password, confirmPassword } = req.body;

  //* Check if values are provided
  if (!username || !password || !confirmPassword)
    return res.status(400).send("Invalid credentials");

  //* Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).send("Passwords must match");

  //* Check if user with given 'username' already exists
  return await prisma.users
    .findFirstOrThrow({ where: { username } })
    .then((userData) => {
      //* Respond with error as this is an invalid operation request
      return res
        .status(409)
        .send(
          `Account for '${username}' already exists. Try signing in OR use a different username!`
        );
    })
    .catch(async (err: PrismaClientKnownRequestError) => {
      if (err.code === "P2025") {
        //* Hash password
        const passwordHash = await hashPassword(password);

        //* No user found so create user
        return await prisma.users
          .create({
            data: {
              username,
              passwordHash,
            },
          })
          .then(async (userData) => {
            //* Generate JWTs
            const payload = { id: userData.id };
            const userAccessToken = generateAccessToken(payload);
            const userRefreshToken = generateRefreshToken(payload);

            //* Update refresh token in db
            await prisma.users
              .update({
                where: { id: userData.id },
                data: { refreshToken: userRefreshToken },
              })
              .catch((err) => {
                return res.sendStatus(500); // Unexpected error
              });

            //* Add refresh token as cookie
            res.cookie("jwt", userRefreshToken, JwtCookieOptions);

            //* Return required user data as response
            const { passwordHash, refreshToken, ...userDataToReturn } =
              userData;
            return res
              .status(201)
              .send({ ...userDataToReturn, accessToken: userAccessToken });
          });
      } else return res.sendStatus(500); // Unexpected error
    });
};

const signOutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(204);
  } // Success and no content to send back

  const refreshToken = cookies.jwt;
  //* Find user with given refresh token
  return await prisma.users
    .findFirstOrThrow({ where: { refreshToken } })
    .then(async (userData) => {
      //* Clear refresh token
      return await prisma.users
        .update({
          where: { id: userData.id },
          data: { refreshToken: "" },
        })
        .then((responseData) => {
          return res.sendStatus(204);
        })
        .catch((err) => {
          return res.sendStatus(500); // Unexpected error
        });
    })
    .catch((err: PrismaClientKnownRequestError) => {
      if (err.code === "P2025") {
        const { maxAge, ...ClearCookieOptions } = JwtCookieOptions;
        res.clearCookie("jwt", ClearCookieOptions);
        return res.sendStatus(204); // Successful but no content to return
      }

      return res.sendStatus(500); // Unexpected error
    });
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  //* Find user with given refresh token
  return await prisma.users
    .findFirstOrThrow({
      where: { refreshToken },
    })
    .then((responseData) => {
      //* Verify refresh token
      const secret = process.env.JWT_REFRESH_TOKEN_SECRET || "refresh_secret";
      type DecodedType = { id: string };
      verify(
        refreshToken,
        secret,
        (
          err: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err || (<DecodedType>decoded).id !== responseData.id)
            return res.sendStatus(403); // Forbidden request

          //* Generate new access token
          const payload = { id: (<DecodedType>decoded).id };
          const accessToken = generateAccessToken(payload);

          //* Return new access token
          return res.json(accessToken);
        }
      );
    })
    .catch(async (err: PrismaClientKnownRequestError) => {
      if (err.code === "P2025") return res.sendStatus(403); // No user found -> Forbidden request

      return res.sendStatus(500); // Unexpected error
    });
};

export const authController = {
  signInUser,
  signUpUser,
  handleRefreshToken,
  signOutUser,
};

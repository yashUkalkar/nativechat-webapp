// Packages
import { JwtPayload, VerifyErrors, verify } from "jsonwebtoken";
import { Request, Response, CookieOptions } from "express";

// DB
import { db } from "../db";

// Utils
import { matchPassword, hashPassword } from "../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

// Types
import { CustomError } from "../types";

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
    return res.status(400).send("Invalid credentials"); //! Bad request

  try {
    //* Check if user exists
    const userData = await db.authQueries.getUserByUsername(username);

    if (userData) {
      //* Match passwords
      const match = await matchPassword(password, userData.passwordHash);
      if (!match)
        //! Unauthorized
        return res.status(401).send("Wrong password. Please try again!");

      //* Generate JWTs
      const payload = { id: userData.id };
      const userAccessToken = generateAccessToken(payload);
      const userRefreshToken = generateRefreshToken(payload);

      //* Update refresh token in DB
      await db.authQueries.updateRefreshToken(userData.id, userRefreshToken);

      //* Return user data and tokens as response
      const { passwordHash, refreshToken, ...userDataToReturn } = userData;
      return res
        .status(200)
        .cookie("jwt", userRefreshToken, JwtCookieOptions)
        .send({ ...userDataToReturn, accessToken: userAccessToken });
    }

    // If unable to access user data
    return res.status(500).send("Some unknown error occurred"); //! Server error
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const signUpUser = async (req: Request, res: Response) => {
  const { username, password, confirmPassword } = req.body;

  //* Check if values are provided
  if (!username || !password || !confirmPassword)
    return res.status(400).send("Invalid credentials"); //! Bad request

  //* Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).send("Passwords must match"); //! Bad request

  try {
    //* Check if user with given 'username' already exists
    const userExists = await db.authQueries.checkIfUserExists(username);
    if (userExists) return res.status(409).send(); //! Conflict

    //* Hash password
    const hashedPassword = await hashPassword(password);

    //* Add user to DB
    const userData = await db.authQueries.addNewUser(username, hashedPassword);

    //* Generate JWTs
    const payload = { id: userData.id };
    const userAccessToken = generateAccessToken(payload);
    const userRefreshToken = generateRefreshToken(payload);

    //* Update refresh token in DB
    await db.authQueries.updateRefreshToken(userData.id, userRefreshToken);

    //* Return user data and tokens as response
    return res
      .status(200)
      .cookie("jwt", userRefreshToken, JwtCookieOptions)
      .send({ ...userData, accessToken: userAccessToken });
  } catch (err) {
    const error = <CustomError>err;
    return res.status(error.code).send(error.message);
  }
};

const signOutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  //* Check if refresh token is provided as cookie with the request
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  else {
    try {
      //* Get user ID from the token
      const refreshToken = cookies.jwt;
      const userID = verifyRefreshToken(refreshToken);
      if (userID) {
        //* Delete refresh token from DB
        await db.authQueries.updateRefreshToken(userID, "");

        //* Clear cookie on user's side
        const { maxAge, ...ClearCookieOptions } = JwtCookieOptions;
        return res.clearCookie("jwt", ClearCookieOptions).sendStatus(204); // No content to return
      } else {
        const customError: CustomError = {
          code: 500,
          message: "Some unknown error occurred",
        };
        throw customError;
      }
    } catch (err) {
      const error = <CustomError>err;
      return res.status(error.code).send(error.message);
    }
  }
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  //* Check if refresh token is provided as cookie with the request
  if (!cookies?.jwt) return res.sendStatus(401); // No content
  else {
    const refreshToken = cookies.jwt;
    try {
      //* Verify refresh token
      const userID = verifyRefreshToken(refreshToken);
      if (userID) {
        const userData = await db.authQueries.getUserByID(userID);
        if (userData.refreshToken !== refreshToken) {
          // User has signed out or request made with older refresh token
          const unauthorizedError: CustomError = {
            code: 401,
            message: "Unable to allow requested action.",
          };
          throw unauthorizedError;
        }

        //* Generate new access token
        const payload = { id: userData.id };
        const accessToken = generateAccessToken(payload);

        //* Return the new access token as response
        return res.json({ accessToken });
      }

      // Some error occurred, no ID found in token
      const customError: CustomError = {
        code: 500,
        message: "Unknown error occurred",
      };
      throw customError;
    } catch (err) {
      const error = <CustomError>err;
      return res.status(error.code).send(error.message);
    }
  }
};

export const authController = {
  signInUser,
  signUpUser,
  handleRefreshToken,
  signOutUser,
};

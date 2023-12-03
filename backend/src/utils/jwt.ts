// Packages
import { sign, verify } from "jsonwebtoken";

// Types
import { CustomError, ExtendedJwtPayload } from "../types";

const generateAccessToken = (payload: { id: string }) => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "access_secret";
  return sign(payload, secret, { expiresIn: "15m" });
};

const generateRefreshToken = (payload: { id: string }) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET || "refresh_secret";
  return sign(payload, secret, { expiresIn: "1d" });
};

/**
 * Validates given refresh token
 * @param {string} refreshToken
 * @returns {string} ID of the user embedded in the JWT payload
 * @throws Error thrown if token is invalid
 */
const verifyRefreshToken = (refreshToken: string) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET || "refresh_secret";
  try {
    const tokenPayload: ExtendedJwtPayload | string = verify(
      refreshToken,
      secret
    );

    return (<ExtendedJwtPayload>tokenPayload)?.id;
  } catch (error) {
    const customError: CustomError = {
      code: 403,
      message: "Invalid request!",
    };
    throw customError;
  }
};

export { generateAccessToken, generateRefreshToken, verifyRefreshToken };

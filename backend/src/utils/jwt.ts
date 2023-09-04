// Packages
import { sign } from "jsonwebtoken";

const generateAccessToken = (payload: { id: string }) => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "access_secret";
  return sign(payload, secret, { expiresIn: "50s" });
};

const generateRefreshToken = (payload: { id: string }) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET || "refresh_secret";
  return sign(payload, secret, { expiresIn: "1d" });
};

export { generateAccessToken, generateRefreshToken };

// Packages
import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// Types
import { RequestTypeWithJWT } from "../types";

const verifyJWT = (
  req: RequestTypeWithJWT,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "access_secret";

  verify(token, secret, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.userDataFromToken = decoded;

    next();
  });
};

export { verifyJWT };

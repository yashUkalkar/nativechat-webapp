import type { Users as UserType } from "@prisma/client";

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
interface RequestTypeWithJWT extends Request {
  userDataFromToken?: string | JwtPayload;
}

export { UserType, RequestTypeWithJWT };

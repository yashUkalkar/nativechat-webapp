import type { Users as UserType } from "@prisma/client";

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
interface RequestTypeWithJWT extends Request {
  userDataFromToken?: string | JwtPayload;
}

//* Socket IO types
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
interface ClientToServerEvents {
  hello: () => void;
}
interface InterServerEvents {
  ping: () => void;
}
interface SocketData {
  user: {
    id: string;
  };
}

export {
  UserType,
  RequestTypeWithJWT,

  // Socket types
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};

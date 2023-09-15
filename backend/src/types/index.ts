import type { Users as UserType } from "@prisma/client";

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface ExtendedJwtPayload extends JwtPayload {
  id?: string;
}
interface RequestTypeWithJWT extends Request {
  userDataFromToken?: string | ExtendedJwtPayload;
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

//* Conversation types
interface ConversationType {
  id: string;
  user: Pick<UserType, "id" | "username" | "profileImage">;
}
type ConversationsList = ({
  users: {
    id: string;
    username: string;
    profileImage: string | null;
  }[];
} & {
  id: string;
})[];

export {
  UserType,
  RequestTypeWithJWT,
  ExtendedJwtPayload,

  // Socket types
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,

  // Conversation types
  ConversationType,
  ConversationsList,
};

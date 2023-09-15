// Packages
import { JwtPayload, VerifyErrors, verify } from "jsonwebtoken";

// Types
import { Socket } from "socket.io";
import { ExtendedJwtPayload } from "../types";

interface ExtendedError extends Error {
  data?: any;
}

const authenticateSocketConnection = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  //* Verify JWT access token
  const { token } = socket.handshake.auth;
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET || "access_secret";

  verify(
    token,
    secret,
    (
      err: VerifyErrors | null,
      decoded: ExtendedJwtPayload | string | undefined
    ) => {
      if (err) return next(new Error("NOT AUTHORIZED!"));

      if (decoded && (<ExtendedJwtPayload>decoded).id) {
        socket.data = {
          user: {
            id: (<ExtendedJwtPayload>decoded).id,
          },
        };
        return next();
      }

      return next(new Error("UNKNOWN ERROR"));
    }
  );
};

export { authenticateSocketConnection };

// Packages
import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";

// Configs
import { allowedOrigins } from "../config/cors.config";

// Event handlers
import { registerConnectionEvents } from "./eventHandlers/connectionEventsHandlers";
import { registerMessagingEvents } from "./eventHandlers/messagingEventsHandler";

// Middlewares
import { authenticateSocketConnection } from "../middlewares/authenticateSocketConnection";

// Types
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "../types";

// Utils
import { addUserToLiveList } from "./LiveConnectionsList";

const socketInit = (httpServer: httpServer) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    path: "/socket",
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => authenticateSocketConnection(socket, next));
  io.on("connection", (socket) => {
    addUserToLiveList(socket.data?.user?.id, socket.id);
    console.log(`New user - UID: ${socket.data?.user?.id} , SID: ${socket.id}`);

    registerSocketEvents(socket);
  });
};

const registerSocketEvents = (socket: Socket) => {
  registerConnectionEvents(socket);
  registerMessagingEvents(socket);
};

export { socketInit };

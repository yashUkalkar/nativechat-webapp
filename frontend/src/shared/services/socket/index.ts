// Packages
import { io, Socket } from "socket.io-client";

// GLOBALS
const SERVER_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:6001";

const socketInstance: Socket = io(SERVER_URL, {
  path: "/socket",
  transports: ["websocket", "webtransport"],
  withCredentials: true,
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  timeout: 20000,
});

export { socketInstance };

// Types
import { Socket } from "socket.io";

const registerMessagingEvents = (socket: Socket) => {
  socket.on("sendGlobalMessage", (message: string) => {
    socket.broadcast.emit("receivedGlobalMessage", {
      message,
      senderUsername: socket?.data?.user?.username,
    });
  });
  //TODO: handle messaging events for a specific conversation
};

export { registerMessagingEvents };

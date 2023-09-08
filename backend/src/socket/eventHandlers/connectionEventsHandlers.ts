// Types
import { Socket } from "socket.io";

import {
  addUserToLiveList,
  removeUserFromLiveList,
} from "../LiveConnectionsList";

const registerConnectionEvents = (socket: Socket) => {
  socket.on("disconnect", () => {
    removeUserFromLiveList(socket.data?.user?.id);
    console.log(`User disconnected - UID: ${socket.data?.user?.id}`);
  });
};

export { registerConnectionEvents };

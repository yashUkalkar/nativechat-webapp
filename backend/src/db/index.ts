// Query handlers
import { authQueries } from "./authQueries";
import { userQueries } from "./userQueries";
import { conversationQueries } from "./conversationQueries";
import { messageQueries } from "./messageQueries";

export const db = {
  authQueries,
  userQueries,
  conversationQueries,
  messageQueries,
};

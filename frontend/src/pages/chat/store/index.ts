// Packages
import { create } from "zustand";

// Slices
import { createConversationsSlice } from "./slices/createConversationsSlice";
import { createCurrentConversationSlice } from "./slices/createCurrentConversationSlice";
import { createCurrentConversationMessagesSlice } from "./slices/createCurrentConversationMessagesSlice";

// Types
import { ConversationStoreCombinedSliceType } from "../types";

const useConversationStore = create<ConversationStoreCombinedSliceType>()(
  (...a) => ({
    ...createConversationsSlice(...a),
    ...createCurrentConversationSlice(...a),
    ...createCurrentConversationMessagesSlice(...a),
  })
);

export { useConversationStore };

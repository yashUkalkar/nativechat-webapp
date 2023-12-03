// Packages
import { create } from "zustand";

// Slices
import { createConversationsSlice } from "./slices/createConversationsSlice";
import { createCurrentConversationSlice } from "./slices/createCurrentConversationSlice";

// Types
import { ConversationStoreCombinedSliceType } from "../types";

const useConversationStore = create<ConversationStoreCombinedSliceType>()(
  (...a) => ({
    ...createConversationsSlice(...a),
    ...createCurrentConversationSlice(...a),
  })
);

export { useConversationStore };

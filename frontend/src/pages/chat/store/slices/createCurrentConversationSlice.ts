// Packages
import { StateCreator } from "zustand";

// Types
import {
  ConversationStoreCombinedSliceType,
  CurrentConversationSlice,
} from "../../types";

const createCurrentConversationSlice: StateCreator<
  ConversationStoreCombinedSliceType,
  [],
  [],
  CurrentConversationSlice
> = (set) => ({
  currentConversation: null,

  setCurrentConversation: (conversation) =>
    set(() => ({ currentConversation: conversation })),

  clearCurrentConversation: () => set(() => ({ currentConversation: null })),
});

export { createCurrentConversationSlice };

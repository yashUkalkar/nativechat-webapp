// Packages
import { StateCreator } from "zustand";

// Types
import {
  ConversationStoreCombinedSliceType,
  CurrentConverstionMessagesSliceType,
} from "../../types";

const createCurrentConversationMessagesSlice: StateCreator<
  ConversationStoreCombinedSliceType,
  [],
  [],
  CurrentConverstionMessagesSliceType
> = (set) => ({
  messagesList: [],
  setMessages: (messages) => set(() => ({ messagesList: messages })),
  addNewMessage: (message) =>
    set((state: CurrentConverstionMessagesSliceType) => ({
      messagesList: [...state.messagesList, message],
    })),
  clearMessages: () => set(() => ({ messagesList: [] })),
});

export { createCurrentConversationMessagesSlice };

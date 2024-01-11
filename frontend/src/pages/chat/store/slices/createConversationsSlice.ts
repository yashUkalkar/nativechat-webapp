// Packages
import { StateCreator } from "zustand";

// Types
import {
  ConversationType,
  ConversationsSliceType,
  ConversationStoreCombinedSliceType,
} from "../../types";

const initialState: ConversationType[] = [
  // Global chat area
  {
    id: "",
    user: {
      id: "global",
      username: "Global Chat",
      profileImage: "",
    },
  },
];

const createConversationsSlice: StateCreator<
  ConversationStoreCombinedSliceType,
  [],
  [],
  ConversationsSliceType
> = (set) => ({
  conversationsList: initialState,

  setConversationsList: (conversations) =>
    set(() => ({
      conversationsList: [...initialState, ...conversations],
    })),

  addNewConversation: (conversation) =>
    set((state: ConversationsSliceType) => ({
      conversationsList: [...state.conversationsList, conversation],
    })),

  removeConversation: (conversationID) =>
    set((state: ConversationsSliceType) => ({
      conversationsList: state.conversationsList.filter(
        (conversation: ConversationType) => conversation.id !== conversationID
      ),
    })),
});

export { createConversationsSlice };

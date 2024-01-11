type ConversationUserType = {
  id: string;
  username: string;
  profileImage: string | null;
};
type ConversationType = {
  id: string;
  user: ConversationUserType;
};

type ConversationsSliceType = {
  conversationsList: ConversationType[];
  setConversationsList: (conversations: ConversationType[]) => void;
  addNewConversation: (conversation: ConversationType) => void;
  removeConversation: (conversationID: string) => void;
};

type CurrentConversationSlice = {
  currentConversation: ConversationType | null;
  setCurrentConversation: (conversation: ConversationType) => void;
  clearCurrentConversation: () => void;
};

type MessageType = {
  id: string;
  conversationID: string;
  senderID: string;
  content: string;
  sentAt: Date;
};

type CurrentConverstionMessagesSliceType = {
  messagesList: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  addNewMessage: (message: MessageType) => void;
  clearMessages: () => void;
};

type ConversationStoreCombinedSliceType = ConversationsSliceType &
  CurrentConversationSlice &
  CurrentConverstionMessagesSliceType;

export type {
  ConversationType,
  ConversationUserType,
  ConversationsSliceType,
  ConversationStoreCombinedSliceType,
  CurrentConversationSlice,
  MessageType,
  CurrentConverstionMessagesSliceType,
};

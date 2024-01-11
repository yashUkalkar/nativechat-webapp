// Packages
import { useEffect } from "react";

// Services
import { socketInstance } from "../../../../shared/services/socket";

// Store
import { useConversationStore } from "../../store";

const MessageAreaDisplayMessages = () => {
  const messagesList = useConversationStore((state) => state.messagesList);
  // const setMessages = useConversationStore((state) => state.setMessages);

  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );

  type GlobalMessageReceiveEventType = {
    message: string;
    senderUsername: string;
  };

  useEffect(() => {
    //* Fetch messages only when current conversation is not 'Global'
    if (currentConversation?.id) {
      //TODO: fetch messages for the conversation
    }

    // GLobal message event listener
    socketInstance.on(
      "receivedGlobalMessage",
      (eventData: GlobalMessageReceiveEventType) => {
        const { message, senderUsername } = eventData;
        if (!currentConversation?.id) {
          console.log(
            `Message: "${message}; Received from: '${senderUsername}'"`
          );
        }
      }
    );

    return () => {
      socketInstance.off("receivedGlobalMessage");
    };
  }, [currentConversation]);

  return (
    <div className="flex-grow h-full max-h-[71.5vh] overflow-x-hidden overflow-y-auto">
      {messagesList.length ? (
        <div>{/*TODO Show messages after fetching here */}</div>
      ) : (
        <div className="h-full w-full overflow-hidden grid place-items-center text-xl md:text-2xl font-semibold text-gray">
          No messages to display!
        </div>
      )}
    </div>
  );
};

export { MessageAreaDisplayMessages };

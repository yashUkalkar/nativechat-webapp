// Page components
import { MessageAreaHeader } from "./MessageAreaHeader";
import { MessageAreaDisplayMessages } from "./MessageAreaDisplayMessages";
import { SendMessageForm } from "./SendMessageForm";

// Store
import { useConversationStore } from "../../store";

const MessageArea = () => {
  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );

  return (
    <div
      id="message-area"
      className="bg-white bg-opacity-70 backdrop-blur-[5px] w-full h-full flex-shrink-0 z-10 lg:col-span-8 lg:rounded-xl lg:shadow-lg overflow-hidden"
    >
      {currentConversation ? (
        <div className="w-full h-full flex flex-col justify-between">
          <MessageAreaHeader />
          <MessageAreaDisplayMessages />
          <SendMessageForm />
        </div>
      ) : (
        <div className="w-full h-full grid place-items-center">
          <p className="text-lg md:text-xl lg:text-2xl max-w-[360px] text-center font-semibold text-gray">
            Please select a conversation to see messages
          </p>
        </div>
      )}
    </div>
  );
};

export { MessageArea };

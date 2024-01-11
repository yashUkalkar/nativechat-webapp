// Packages
import { useState } from "react";

// Services
import { socketInstance } from "../../../../shared/services/socket";

// Store
import { useConversationStore } from "../../store";

// Assets
import { SendIcon } from "../../../../assets/icons/icons";

const SendMessageForm = () => {
  const [message, setMessage] = useState<string>("");

  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );

  //TODO: implement message send backend calls
  // Message send handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      if (currentConversation?.id) {
        //TODO: emit socket event for specific conversation
      } else {
        // Global emit
        socketInstance.emit("sendGlobalMessage", message);
        console.log(`Message send event emitted`);
      }

      // Clear message field
      setMessage("");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[1px] bg-pink" />
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between items-center gap-2 bg-white"
      >
        <input
          type="text"
          placeholder="Enter your message here!"
          className="flex-grow p-2 outline-none focus:placeholder:text-pink focus:placeholder:text-opacity-50 placeholder:font-medium"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink p-2 px-3 text-white font-medium flex justify-between items-center gap-2 hover:scale-105 transition-all active:scale-100"
          title="Send"
        >
          <p className="text-white">Send</p>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export { SendMessageForm };

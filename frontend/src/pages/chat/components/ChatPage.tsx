// Components
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatContainer } from "./ChatContainer/ChatContainer";

const ChatPage = () => {
  return (
    <div className="w-screen h-screen min-h-screen overflow-x-hidden flex flex-col gap-3">
      <ChatHeader />
      <ChatContainer />
    </div>
  );
};

export { ChatPage };

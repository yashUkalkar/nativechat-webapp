// Components
import { ChatsArea } from "../ChatsArea/ChatsArea";
import { MessageArea } from "../MessageArea/MessageArea";

const ChatContainer = () => {
  return (
    <section className="w-full h-full flex-grow flex lg:grid lg:grid-cols-12 lg:gap-3 lg:px-4 lg:pb-2">
      <ChatsArea />
      <MessageArea />
    </section>
  );
};

export { ChatContainer };

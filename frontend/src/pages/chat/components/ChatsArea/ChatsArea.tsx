// Component
import { ChatsAreaHeader } from "./ChatsAreaHeader";
import { ChatsList } from "./ChatsList";

const ChatsArea = () => {
  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-[5px] w-full h-full flex-shrink-0 lg:col-span-4 lg:rounded-xl lg:shadow-lg flex flex-col gap-1 overflow-clip relative">
      <ChatsAreaHeader />
      <ChatsList />
    </div>
  );
};

export { ChatsArea };

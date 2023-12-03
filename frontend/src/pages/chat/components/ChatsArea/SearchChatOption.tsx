// Packages
import { useState } from "react";

// Store
import { useConversationStore } from "../../store";

// Types
import { ConversationType } from "../../types";

// Assets
import { SearchIcon, UserCircleIcon } from "../../../../assets/icons/icons";

const SearchChatOption = ({
  setShowFilterComponent,
}: {
  setShowFilterComponent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const conversationsList = useConversationStore(
    (state) => state.conversationsList
  );
  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );
  const setCurrentConversation = useConversationStore(
    (state) => state.setCurrentConversation
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery) {
      const filteredConversations: ConversationType[] =
        conversationsList.filter((conv) =>
          conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

      setConversations(filteredConversations);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 justify-between">
      <form
        className="w-full flex items-center justify-between gap-2"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          minLength={1}
          maxLength={30}
          placeholder="Enter chat name"
          className="w-full outline-none bg-transparent border-b-[1.5px] border-b-dark-blue hover:border-b-pink focus:border-b-pink placeholder:text-dark-blue focus:placeholder:text-pink placeholder:text-opacity-70 focus:placeholder:text-opacity-70 px-1"
        />
        <button
          type="submit"
          className="text-xl hover:scale-110 active:scale-95 transition"
          title="Search"
        >
          <SearchIcon />
        </button>
      </form>
      <div className="flex-grow w-full h-full max-h-[70vh]">
        {conversations.length ? (
          conversations.map((conversation) => (
            <div
              className={
                "flex items-center justify-start gap-3 p-2 m-1 rounded-lg hover:scale-[1.01] hover:shadow-md active:scale-100 transition cursor-pointer" +
                (currentConversation?.id === conversation.id
                  ? " border-none bg-pink text-white"
                  : " bg-white border-[1px] border-pink")
              }
              onClick={() => {
                setCurrentConversation(conversation);
                setShowFilterComponent(false);
              }}
            >
              <span
                className={
                  "w-9 h-9 rounded-full grid place-items-center overflow-hidden p-[0.7px]" +
                  (currentConversation?.id === conversation.id
                    ? " bg-white border-none"
                    : " border-pink border-2")
                }
              >
                {conversation.user.profileImage ? (
                  <img
                    className="w-full h-full rounded-full"
                    src={conversation.user.profileImage}
                    alt={conversation.user.username}
                  />
                ) : (
                  <UserCircleIcon />
                )}
              </span>
              <p className="text-xl font-medium text-current">
                {conversation.user.username}
              </p>
            </div>
          ))
        ) : (
          <div className="grid place-items-center w-full h-full">
            <p className="text-xl font-semibold">No results to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { SearchChatOption };

// Store
import { useConversationStore } from "../../store";

// Assets
import { GlobeIcon, UserCircleIcon } from "../../../../assets/icons/icons";

const MessageAreaHeader = () => {
  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );

  return currentConversation ? (
    <div className="relative p-2 after:h-[1px] after:w-full after:absolute after:bottom-0 after:left-0 after:bg-pink">
      <div className="flex items-center gap-4">
        <span className="w-9 h-9 rounded-full grid place-items-center overflow-hidden p-[0.7px] border-pink border-2">
          {currentConversation.id ? (
            currentConversation.user.profileImage ? (
              <img
                className="w-full h-full rounded-full"
                src={currentConversation.user.profileImage}
                alt={currentConversation.user.username}
              />
            ) : (
              <UserCircleIcon />
            )
          ) : (
            <GlobeIcon />
          )}
        </span>
        <p className="text-xl font-medium">
          {currentConversation.user.username}
        </p>
      </div>
    </div>
  ) : (
    <p className="text-error, text-xl text-center">Some error occured!</p>
  );
};

export { MessageAreaHeader };

// Packages
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Store
import { useConversationStore } from "../../store";

// Types
import { ConversationType } from "../../types";

// Assets
import { UserCircleIcon, GlobeIcon } from "../../../../assets/icons/icons";
// import { faUserCircle, faGlobe } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
  conversation: ConversationType;
}
const ChatOption = (props: PropsType) => {
  const { conversation } = props;

  const currentConversation = useConversationStore(
    (state) => state.currentConversation
  );
  const setCurrentConversation = useConversationStore(
    (state) => state.setCurrentConversation
  );

  //TODO: create a delete button to be shown on hover to delete conversation

  return (
    <div
      className={
        "flex items-center justify-start gap-3 p-2 m-1 rounded-lg hover:scale-[1.01] hover:shadow-md active:scale-100 transition cursor-pointer" +
        (currentConversation?.id === conversation.id
          ? " border-none bg-pink text-white"
          : " bg-white border-[1px] border-pink")
      }
      onClick={() => setCurrentConversation(conversation)}
    >
      <span
        className={
          "w-9 h-9 rounded-full grid place-items-center overflow-hidden p-[0.7px]" +
          (currentConversation?.id === conversation.id
            ? " bg-white border-none"
            : " border-pink border-2")
        }
      >
        {conversation.id ? (
          conversation.user.profileImage ? (
            <img
              className="w-full h-full rounded-full"
              src={conversation.user.profileImage}
              alt={conversation.user.username}
            />
          ) : (
            <UserCircleIcon />
          )
        ) : (
          <GlobeIcon />
        )}
      </span>
      <p className="text-xl font-medium text-current">
        {conversation.user.username}
      </p>
    </div>
  );
};

export { ChatOption };

// Packages
import { useEffect } from "react";

// Components
import { ChatOption } from "./ChatOption";

// Store
import { useStore } from "../../../../shared/store";
import { useConversationStore } from "../../store";

// Services
import { useAxiosPrivate } from "../../../../shared/hooks/useAxiosPrivate";
import { getAllConversations } from "../../services/conversationsRequests";

const ChatsList = () => {
  const axiosPrivate = useAxiosPrivate();

  const conversationsList = useConversationStore(
    (state) => state.conversationsList
  );
  const setConversationsList = useConversationStore(
    (state) => state.setConversationsList
  );

  const showError = useStore((state) => state.showError);
  const removeError = useStore((state) => state.removeError);

  useEffect(() => {
    getAllConversations(axiosPrivate)
      .then((conversations) => setConversationsList(conversations))
      .catch((err) => {
        if (err instanceof Error) {
          showError(err.message);
        } else {
          showError("Unknown issue faced, Sorry.");
        }
      })
      .finally(() => {
        setTimeout(() => {
          removeError();
        }, 7000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-grow">
      {conversationsList.length ? (
        <div className="w-full h-full max-h-[79vh] overflow-x-hidden">
          {conversationsList.map((conversation) => (
            <ChatOption {...{ conversation }} key={conversation.id} />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center w-full h-full">
          <p className="text-xl font-bold text-center">
            No conversations to show
          </p>
        </div>
      )}
    </div>
  );
};

export { ChatsList };

// Packages
import { useState } from "react";

// Store
import { useStore } from "../../../../shared/store";
import { useConversationStore } from "../../store";

// Services
import { useAxiosPrivate } from "../../../../shared/hooks/useAxiosPrivate";
import { getUsersByUsernameMatch } from "../../services/userRequests";
import { createNewConversation } from "../../services/conversationsRequests";

// Types
import { ConversationUserType } from "../../types";

// Assets
import { SearchIcon, UserCircleIcon } from "../../../../assets/icons/icons";

const NewChatOption = ({
  setShowFilterComponent,
}: {
  setShowFilterComponent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState<ConversationUserType[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const axiosPrivate = useAxiosPrivate();

  const showError = useStore((state) => state.showError);
  const removeError = useStore((state) => state.removeError);

  const conversationsList = useConversationStore(
    (state) => state.conversationsList
  );
  const addNewConversation = useConversationStore(
    (state) => state.addNewConversation
  );

  const userIDsInConversations = conversationsList.map((conv) => conv.user.id);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery) {
      getUsersByUsernameMatch(axiosPrivate, searchQuery)
        .then((usersList) => {
          const users = usersList.filter(
            (user) => !userIDsInConversations.includes(user.id)
          );
          console.log(usersList, users);
          setUsers(users);
        })
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
          placeholder="Enter username"
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
        {users.length ? (
          users.map((user) => (
            <div
              className="flex items-center justify-start gap-3 p-2 m-1 rounded-lg hover:scale-[1.01] hover:shadow-md active:scale-100 transition cursor-pointer bg-white border-[1px] border-pink"
              onClick={() => {
                //TODO: Add loading animation for the duration
                createNewConversation(axiosPrivate, user.id)
                  .then((conv) => {
                    addNewConversation(conv);
                    setShowFilterComponent(false);
                  })
                  .catch((err) => {
                    if (err instanceof Error) {
                      showError(err.message);
                    } else {
                      showError("Unknown issue faced!");
                    }
                  })
                  .finally(() => {
                    setTimeout(() => {
                      removeError();
                    }, 7000);
                  });
              }}
            >
              <span className="w-9 h-9 rounded-full grid place-items-center overflow-hidden p-[0.7px] border-pink border-2">
                {user.profileImage ? (
                  <img
                    className="w-full h-full rounded-full"
                    src={user.profileImage}
                    alt={user.username}
                  />
                ) : (
                  <UserCircleIcon />
                )}
              </span>
              <p className="text-xl font-medium text-current">
                {user.username}
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

export { NewChatOption };

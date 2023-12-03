// Component
import { SearchChatOption } from "./SearchChatOption";
import { NewChatOption } from "./NewChatOption";

// Assets
import { GoBackIcon } from "../../../../assets/icons/icons";

interface PropsType {
  setShowFilterComponent: React.Dispatch<React.SetStateAction<boolean>>;
  filterComponentType: "Search" | "Add" | null;
}
const ConversationFilterComponent = (props: PropsType) => {
  const { setShowFilterComponent, filterComponentType } = props;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 backdrop-blur-[5px] p-3 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <span
          className="text-xl cursor-pointer hover:scale-125 active:scale-95 transition"
          onClick={() => setShowFilterComponent(false)}
          title="Go back"
        >
          <GoBackIcon />
        </span>
        <p className="flex-grow text-center font-semibold text-xl">
          {filterComponentType === "Add" ? "Search user" : "Search your chats"}
        </p>
      </div>

      <div className="flex-grow w-full h-full">
        {filterComponentType === "Search" ? (
          <SearchChatOption {...{ setShowFilterComponent }} />
        ) : (
          <NewChatOption {...{ setShowFilterComponent }} />
        )}
      </div>
    </div>
  );
};
export { ConversationFilterComponent };

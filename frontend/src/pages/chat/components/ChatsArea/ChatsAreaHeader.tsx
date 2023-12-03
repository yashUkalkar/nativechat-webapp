// Packages
import { useState } from "react";

// Components
import { AddNewChat } from "./AddNewChat";
import { SearchChat } from "./SearchChat";
import { ConversationFilterComponent } from "./ConversationFilterComponent";

const ChatsAreaHeader = () => {
  type ConversationFilterType = "Search" | "Add" | null;

  const [showFilterComponent, setShowFilterComponent] =
    useState<boolean>(false);
  const [filterComponentType, setFilterComponentType] =
    useState<ConversationFilterType>(null);

  return (
    <div className="border-b-[1px] border-pink p-2 px-3 lg:px-2 flex items-center justify-between">
      <p className="text-xl font-semibold">Conversations</p>
      <div className="flex items-center justify-between gap-5">
        <div
          onClick={() => {
            setFilterComponentType("Search");
            setShowFilterComponent(true);
          }}
        >
          <SearchChat />
        </div>
        <div
          onClick={() => {
            setFilterComponentType("Add");
            setShowFilterComponent(true);
          }}
        >
          <AddNewChat />
        </div>
        {showFilterComponent ? (
          <ConversationFilterComponent
            {...{ setShowFilterComponent, filterComponentType }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export { ChatsAreaHeader };

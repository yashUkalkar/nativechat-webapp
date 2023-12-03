// Packages
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import { AddIcon } from "../../../../assets/icons/icons";
// import { faAdd } from "@fortawesome/free-solid-svg-icons";

const AddNewChat = () => {
  return (
    <span
      className="cursor-pointer w-6 h-6 rounded-full grid place-items-center border-2 border-transparent hover:scale-110 hover:border-pink active:scale-100 transition"
      title="New chat"
    >
      <AddIcon />
    </span>
  );
};

export { AddNewChat };

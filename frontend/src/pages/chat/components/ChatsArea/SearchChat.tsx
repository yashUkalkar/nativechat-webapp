// Packages
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import { SearchIcon } from "../../../../assets/icons/icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchChat = () => {
  return (
    <span
      className="cursor-pointer w-7 h-7 rounded-full grid place-items-center border-2 border-transparent hover:scale-110 hover:border-pink active:scale-100 transition"
      title="Search chat"
    >
      <SearchIcon />
    </span>
  );
};

export { SearchChat };

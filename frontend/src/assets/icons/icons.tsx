// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Types
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// Icons
import {
  faUser,
  faLock,
  faExclamationCircle,
  faHome,
  faClose,
  faUserCircle,
  faPowerOff,
  faArrowLeft,
  faAdd,
  faGlobe,
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const UserIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faUser} {...props} />
);
const LockIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faLock} {...props} />
);
const ErrorIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faExclamationCircle} {...props} />
);
const HomeIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faHome} {...props} />
);
const CloseIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faClose} size="lg" {...props} />
);
const UserCircleIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faUserCircle} size="lg" {...props} />
);
const SignoutIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faPowerOff} {...props} />
);
const GoBackIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faArrowLeft} {...props} />
);
const AddIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faAdd} {...props} />
);
const GlobeIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faGlobe} size="lg" {...props} />
);
const SearchIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />
);
const SendIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon icon={faPaperPlane} {...props} />
);

export {
  UserIcon,
  LockIcon,
  ErrorIcon,
  HomeIcon,
  CloseIcon,
  UserCircleIcon,
  SignoutIcon,
  GoBackIcon,
  AddIcon,
  GlobeIcon,
  SearchIcon,
  SendIcon,
};

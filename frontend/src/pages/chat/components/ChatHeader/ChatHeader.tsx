// Components
import { NamedLogo } from "../../../../shared/components/NamedLogo";
import { ProfileLink } from "./ProfileLink";
import { SignoutButton } from "../shared/SignoutButton";
import { ProfileSectionMobile } from "./ProfileSectionMobile";

const ChatHeader = () => {
  return (
    <header className="flex justify-between items-center bg-white bg-opacity-70 backdrop-blur-[5px] p-3 md:px-5">
      <NamedLogo collapsible />
      <ProfileLink />
      <SignoutButton />
      <ProfileSectionMobile />
    </header>
  );
};

export { ChatHeader };

// Packages
import { useState } from "react";

// Components
import { ProfileIcon } from "../ProfileIcon";
import { ProfileSection } from "./ProfileSection";

const ProfileSectionMobile = () => {
  const [showProfileSection, setShowProfileSection] = useState<boolean>(false);

  return (
    <div className="md:hidden" title="Profile">
      <div
        className="hover:scale-110 active:scale-100 transition cursor-pointer"
        onClick={() => setShowProfileSection(true)}
      >
        <ProfileIcon />
      </div>

      {showProfileSection ? (
        <section className="fixed top-0 left-0 bg-white bg-opacity-90 backdrop-blur-[5px] z-20 w-screen h-screen min-h-screen overflow-x-hidden">
          <ProfileSection {...{ setShowProfileSection }} />
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export { ProfileSectionMobile };

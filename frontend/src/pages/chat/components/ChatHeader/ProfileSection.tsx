// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import { SignoutButton } from "../shared/SignoutButton";

// Assets
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProfileSection = ({
  setShowProfileSection,
}: {
  setShowProfileSection: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section className="w-full h-full">
      <div className="flex items-center justify-between p-2">
        <span
          className="flex items-center justify-between gap-2 text-lg font-medium transition relative after:w-full after:h-[2px] after:bg-pink after:absolute after:bottom-[-5px] lg:after:bottom-0 after:left-0 after:scale-0 hover:after:scale-100 active:after:bg-dark-blue after:transition cursor-pointer hover:scale-105 active:scale-100"
          onClick={() => setShowProfileSection(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p className="mt-[2px]">Go back</p>
        </span>

        <SignoutButton showOnSmallScreens />
      </div>

      {
        // TODO: implement info section and translation options
      }
      <div>Profile section information and translation options</div>
    </section>
  );
};

export { ProfileSection };

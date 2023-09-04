// Packages
import { Outlet, Link } from "react-router-dom";

// Components
import { NamedLogo } from "../../../../shared/components/NamedLogo";

const AuthDashboard = () => {
  return (
    <div className="w-screen h-screen max-h-screen overflow-x-hidden flex flex-col">
      <header className="bg-white p-2 bg-opacity-70 backdrop-blur-[5px]">
        <Link to="/">
          <NamedLogo />
        </Link>
      </header>

      <section className="grid place-items-center flex-grow h-full">
        <Outlet />
      </section>
    </div>
  );
};

export { AuthDashboard };

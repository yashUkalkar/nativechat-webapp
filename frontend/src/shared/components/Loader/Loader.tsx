import "./Loader.Style.css";

const Loader = () => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 grid place-items-center z-20 bg-dark-blue text-transparent">
      <h1 className="loader-text text-3xl font-semibold md:text-5xl">
        NativeChat
      </h1>
    </div>
  );
};

export { Loader };

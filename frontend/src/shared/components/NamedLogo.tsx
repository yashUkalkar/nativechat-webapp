interface PropType {
  collapsible?: boolean;
}
const NamedLogo = (props: PropType) => {
  const { collapsible } = props;

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        N
        <span className={collapsible ? "hidden md:inline-block" : ""}>
          ative
        </span>
        <span className="text-pink ml-[2px]">
          C
          <span
            className={
              "text-pink" + (collapsible ? " hidden md:inline-block" : " ")
            }
          >
            hat
          </span>
        </span>
      </h1>
    </div>
  );
};

export { NamedLogo };

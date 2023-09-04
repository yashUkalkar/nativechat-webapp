interface PropType {
  text: string;
  disabled: boolean;
}
const SubmitButton = (props: PropType) => {
  return (
    <button
      disabled={props.disabled}
      className={
        " text-white p-2 px-4 rounded-xl text-lg font-medium" +
        (props.disabled
          ? " bg-gray opacity-50"
          : " bg-pink hover:bg-dark-blue cursor-pointer hover:scale-105 active:scale-95 transition")
      }
      type="submit"
    >
      {props.text}
    </button>
  );
};

export { SubmitButton };

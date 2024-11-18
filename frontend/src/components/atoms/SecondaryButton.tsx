type SecondaryButtonProps = {
  buttonText: string;
  type: "button" | "submit" | "reset";
};

export function SecondaryButton({ buttonText, type }: SecondaryButtonProps) {
  return (
    <button
      className="bg-white text-blue pl-10 pr-10 pt-2 pb-2 rounded-lg shadow-md font-bold"
      type={type}
    >
      {buttonText}
    </button>
  );
}

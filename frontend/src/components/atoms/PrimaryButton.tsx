type PrimaryButtonProps = {
  buttonText: string;
  type: "button" | "submit" | "reset";
};

export function PrimaryButton({ buttonText, type }: PrimaryButtonProps) {
  return (
    <button
      className="bg-blue text-white pl-10 pr-10 pt-2 pb-2 rounded-lg shadow-md font-bold"
      type={type}
    >
      {buttonText}
    </button>
  );
}

type PrimaryButtonProps = {
  buttonText: string;
  type: "button" | "submit" | "reset";
};

export function PrimaryButton({ buttonText, type }: PrimaryButtonProps) {
  return (
    <button className="bg-blue-500" type={type}>
      {buttonText}
    </button>
  );
}

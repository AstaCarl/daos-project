type PrimaryButtonProps = {
  buttonText: string;
  type: "button" | "submit" | "reset";
};

export function PrimaryButton({ buttonText, type }: PrimaryButtonProps) {
  return <button type={type}>{buttonText}</button>;
}

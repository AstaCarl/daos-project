type PrimaryButtonProps = {
  buttonText: string;
};

export function PrimaryButton({ buttonText }: PrimaryButtonProps) {
  return <button>{buttonText}</button>;
}

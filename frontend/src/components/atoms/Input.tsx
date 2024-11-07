type InputProps = {
  inputPlaceholder: string;
};

export function Input({ inputPlaceholder }: InputProps) {
  return <input type="text" placeholder={inputPlaceholder} />;
}

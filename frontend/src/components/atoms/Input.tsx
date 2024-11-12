type InputProps = {
  inputPlaceholder: string;
  id: string;
  inputName: string;
};

export function Input({ inputPlaceholder, id, inputName }: InputProps) {
  return (
    <input
      id={id}
      name={inputName}
      type="text"
      placeholder={inputPlaceholder}
    />
  );
}

type InputProps = {
  inputPlaceholder: string;
  inputName: string;
  id: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  inputPlaceholder,
  inputName,
  id,
  onChange,
  value,
}: InputProps) {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      name={inputName}
      type="text"
      placeholder={inputPlaceholder}
      className="border border-border-gray rounded-md p-2 font-sans text-base placeholder:font-sans placeholder:text-dark-grey shadow-md"
    />
  );
}

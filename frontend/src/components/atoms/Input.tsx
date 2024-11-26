type InputProps = {
  inputPlaceholder: string;
  inputName: string;
  id: string;
  value: string;
  labelText?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
};

export function Input({
  inputPlaceholder,
  labelText,
  inputName,
  id,
  onChange,
  value,
  type,
  errorMessage,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-dark-grey font-sans text-sm">
        {labelText}
      </label>
      <input
        onChange={onChange}
        value={value}
        id={id}
        name={inputName}
        type={type}
        placeholder={inputPlaceholder}
        className={`p-3 border w-full accent-grey rounded-md font-sans text-base placeholder:font-sans placeholder:text-dark-grey shadow-md  ${errorMessage ? 'border-red' : 'accent-grey'}`}
      />
      {errorMessage && (
        <span className="text-red text-sm">{errorMessage}</span>
      )}
    </div>
  );
}

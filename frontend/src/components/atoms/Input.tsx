
// component for input field, that also has checkbox as a type, with a label and error message


// Input component props
type InputProps = {
  inputPlaceholder?: string;
  inputName: string;
  id: string;
  value: string;
  labelText?: string;
  type: string;
  // onChange function that takes an event as an argument
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  checked?: boolean;
};

export function Input({
  inputPlaceholder,
  labelText,
  inputName,
  id,
  onChange,
  value,
  type,
  checked,
  errorMessage,
}: InputProps) {
// If the type is checkbox, return a checkbox input field instead of a regular
  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-4">
        <input
          onChange={onChange}
          value={value}
          id={id}
          name={inputName}
          type={type}
          checked={checked}
          className={`w-5 h-5  shadow-md`}
        />
        <label htmlFor={id} className="text-blue font-sans text-base">
          {labelText}
        </label>
        {errorMessage && (
          <span className="text-red text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
// If the type is not checkbox, return a regular input field
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
        className={`p-3 border w-full accent-grey rounded-md font-sans text-base placeholder:font-sans placeholder:text-dark-grey shadow-md  ${
          errorMessage ? "border-red" : "accent-grey"
        }`}
      />
      {/* error message styling */}
      {errorMessage && <span className="text-red text-sm">{errorMessage}</span>}
    </div>
  );
}

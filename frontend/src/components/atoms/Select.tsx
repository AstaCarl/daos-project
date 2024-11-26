type SelectProps = {
  name: string;
  label?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
  errorMessage?: string;
};

export default function Select({
  name,
  label,
  onChange,
  children,
  errorMessage,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-dark-grey font-sans text-sm" htmlFor="select">{label}</label>
      <select
        className={`text-dark-grey p-3 border w-full accent-grey rounded-md font-sans text-base placeholder:font-sans placeholder:text-dark-grey shadow-md ${errorMessage ? 'border-red' : 'accent-grey'}`}
        id="select"
        onChange={onChange}
        name={name}
      >
        {children}
      </select>
      {errorMessage && (
          <span className="text-red text-sm">{errorMessage}</span>
        )}
      </div>
  );
}

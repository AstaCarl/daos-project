type TextAreaProps = {
    inputPlaceholder: string;
    inputName: string;
    id: string;
    value: string;
    labelText?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    errorMessage?: string;
  };
  
  export function TextArea({
    inputPlaceholder,
    labelText,
    inputName,
    id,
    onChange,
    value,
    errorMessage,
  }: TextAreaProps) {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-dark-grey font-sans text-sm">
          {labelText}
        </label>
        <textarea
          onChange={onChange}
          value={value}
          id={id}
          name={inputName}
          placeholder={inputPlaceholder}
          className={`p-3 border w-full border-border-grey rounded-md font-sans text-base placeholder:font-sans placeholder:text-dark-grey shadow-md  ${errorMessage ? 'border-red' : 'border-border-grey'}`}
        />
        {errorMessage && (
          <span className="text-red text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
  
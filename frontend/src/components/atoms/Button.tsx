
// Button component with different variants


// Button component props
type ButtonProps = {
  buttonText: string | undefined;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "iconButton" | "delete";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  // takes children as a prop
  children?: React.ReactNode;
};

export function Button({ buttonText, type = "button", variant, children, size="medium", onClick }: ButtonProps) {

  // classes for different button variants
  const variantClasses = {
    primary: "bg-blue text-white",
    secondary: "bg-white text-blue border border-grey w-full",
    iconButton: "font-display text-blue text-xl font-bold  pb-[8px] flex flex-col items-center justify-center border accent-grey w-full",
    delete: "bg-transparent text-red border border-grey w-full",
  };

  // classes for different button sizes
  const sizeClasses = {
    small: "px-4 py-1 text-sm",
    medium: "px-6 py-2",
    large: "px-8 py-4 text-lg",
  };

  // classes for button
  const classes = `rounded-lg shadow-md font-bold ${variantClasses[variant]} ${sizeClasses[size]}`;


  return (
    <button onClick={onClick} className={classes} type={type}>
      {/* If there is children display them in a div and give them the style */}
      {children && <div className="w-10 h-10">{children}</div>}
      {buttonText}
    </button>
  );
}
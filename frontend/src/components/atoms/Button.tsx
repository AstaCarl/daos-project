type ButtonProps = {
  buttonText: string | undefined;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant: "primary" | "secondary" | "delete";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

export function Button({ buttonText, type = "button", href, variant, size="medium", onClick }: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue text-white",
    secondary: "bg-white text-blue border border-grey w-full",
    delete: "bg-transparent text-red border border-grey w-full",
  };

  const sizeClasses = {
    small: "px-4 py-1 text-sm",
    medium: "pl-10 pr-10 pt-2 pb-2",
    large: "px-8 py-4 text-lg",
  };

  const classes = `rounded-lg shadow-md font-bold ${variantClasses[variant]} ${sizeClasses[size]}`;



  if (href) {
    return (
      <a href={href} className={classes}>
        {buttonText}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} type={type}>
      {buttonText}
    </button>
  );
}
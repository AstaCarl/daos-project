type ButtonProps = {
  buttonText: string | undefined;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant: "primary" | "secondary" | "iconButton" | "delete";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children?: React.ReactNode;
};

export function Button({ buttonText, type = "button", href, variant, children, size="medium", onClick }: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue text-white",
    secondary: "bg-white text-blue border border-grey w-full",
    iconButton: "font-display text-blue text-xl font-bold  pb-[8px] flex flex-col items-center justify-center border accent-grey w-full",
    delete: "bg-transparent text-red border border-grey w-full",
  };

  const sizeClasses = {
    small: "px-4 py-1 text-sm",
    medium: "px-6 py-2",
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
      {children && <div className="w-10 h-10">{children}</div>}
      {buttonText}
    </button>
  );
}
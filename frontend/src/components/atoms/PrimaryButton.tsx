type PrimaryButtonProps = {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  variant: "primary" | "secondary";
};

export function PrimaryButton({ buttonText, type = "button", href, variant }: PrimaryButtonProps) {
  const variantClasses = {
    primary: "bg-blue text-white",
    secondary: "bg-white text-blue border border-gray",
  };

  if (href) {
    return (
      <a href={href} className={`pl-10 pr-10 pt-2 pb-2 rounded-lg shadow-md font-bold ${variantClasses[variant]}`}>
        {buttonText}
      </a>
    );
  }

  return (
    <button className={`pl-10 pr-10 pt-2 pb-2 rounded-lg shadow-md font-bold ${variantClasses[variant]}`} type={type}>
      {buttonText}
    </button>
  );
}
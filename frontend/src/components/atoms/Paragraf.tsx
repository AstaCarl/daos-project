
// paragraf component, that has 4 different variants


type Props = {
  variant: "body" | "body-small" | "body-small-red" | "body-grey";
  paragrafText: string | number;
  className?: string;
};

export default function Paragraf({
  variant,
  paragrafText,
  className,
}: Props) {
  const variantClasses = {
    body: "text-base text-dark-grey",
    "body-small": "text-sm text-dark-grey",
    "body-small-red": "text-sm text-red font-bold",
    "body-grey": "text-sm text-[#777777]",
  };
  return (
    <p className={`font-sans ${variantClasses[variant]} ${className}`}>
      {paragrafText}
    </p>
  );
}

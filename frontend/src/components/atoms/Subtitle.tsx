type Props = {
  variant: "default" | "footer" | "cardTitle" | "instrument" | "contact" | "red";
  subtitle: string;
};

export default function Subtitle({ variant, subtitle }: Props) {
  const variantClasses = {
    default: "font-sans text-blue text-base font-bold ",
    cardTitle: "font-display text-blue text-xl font-bold",
    footer: "font-display uppercase font-[500] text-white text-xl",
    instrument: "font-display text-blue text-2xl font-bold",
    contact: "font-sans text-blue text-xl font-bold",
    red: "font-display text-red text-xl font-bold",
  };
  return <h2 className={variantClasses[variant]}>{subtitle}</h2>;
}

type Props = {
  title: string;
  variant: "red" | "default" | "frontpageHero";
};

export function Title({ title, variant }: Props) {
  const variantClasses = {
    red: "text-red font-medium text-xl font-display",
    default: "font-display text-blue text-3xl",
    frontpageHero: "text-red font-medium text-[34px] font-display",
  };
  return <h1 className={`${variantClasses[variant]}`}>{title}</h1>;
}

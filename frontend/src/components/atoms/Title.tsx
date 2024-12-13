type Props = {
  title: string;
  variant: "red" | "default" | "frontpageHero" | "white" | "blue";
};

export function Title({ title, variant }: Props) {
  const variantClasses = {
    red: "text-red font-medium text-xl font-display",
    default: "font-display text-blue text-3xl",
    frontpageHero: "text-red font-medium text-[34px] font-display",
    white: "font-display font-medium text-white text-3xl", 
    blue: "font-display font-medium text-blue text-3xl", 
  };
  return <h1 className={`${variantClasses[variant]}`}>{title}</h1>;
}

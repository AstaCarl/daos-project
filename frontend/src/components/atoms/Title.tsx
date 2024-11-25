type Props = {
  title: string;
  variant: "red" | "default";
};

export function Title({ title, variant }: Props) {
  const variantClasses = {
    red: "text-red font-medium text-xl font-display",
    default: "font-display text-blue text-3xl",
  };
  return <h1 className={`${variantClasses[variant]}`}>{title}</h1>;
}

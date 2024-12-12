import { Link } from "react-router-dom";

type anchorProps = {
  href: string;
  anchorText: string;
  variant: "navigation" | "footer" | "default" | "iconAnchor";
};

export default function Anchor({
  href,
  anchorText,
  variant,
}: anchorProps) {
  const variantClasses = {
    navigation: "font-bold text-base text-blue font-sans",
    footer: "font-bold text-base text-white font-sans",
    default: "underline text-dark-grey text-sm font-sans",
    iconAnchor:
      "font-display text-blue text-xl font-bold  pb-[8px] flex flex-col items-center justify-center",
  };
  return (
    <Link className={`cursor-pointer  ${variantClasses[variant]}`} to={href}>
      {anchorText}
    </Link>
  );
}

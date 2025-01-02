import { Link } from "react-router-dom";

// Achnor component, with different variants

// Anchor component props
type anchorProps = {
  href: string;
  anchorText: string;
  // variants of the anchor
  variant:
    | "navigation"
    | "footer"
    | "default"
    | "iconAnchor"
    | "buttonPrimary"
    | "buttonSecondary";
};

export default function Anchor({ href, anchorText, variant }: anchorProps) {
  // classes for the different variants of the anchor
  const variantClasses = {
    navigation: "font-bold text-base text-blue font-sans",
    footer: "font-bold text-base text-white font-sans",
    default: "underline text-dark-grey text-sm font-sans",
    iconAnchor:
      "font-display text-blue text-xl font-bold  pb-[8px] flex flex-col items-center justify-center",
    buttonPrimary: "bg-blue text-white rounded-lg shadow-md font-bold px-6 py-2",
    buttonSecondary:
      "bg-white text-blue border border-grey w-full rounded-lg shadow-md font-bold px-6 py-2",
  };
  return (
    // Link component from react-router-dom
    <Link className={`cursor-pointer  ${variantClasses[variant]}`} to={href}>
      {anchorText}
    </Link>
  );
}

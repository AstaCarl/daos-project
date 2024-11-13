import { Link } from "react-router-dom";

type anchorProps = {
    href: string;
    anchorText: string;
    variant: "navigation" | "footer" | "default";
}

export default function Anchor({href, anchorText, variant}: anchorProps) {
    const variantClasses = {
      navigation: "font-bold text-base text-blue",
      footer: "font-bold text-base text-white",
      default: "underline text-dark-grey text-sm"
    };
  return (
    <Link className={`cursor-pointer font-sans ${variantClasses[variant]}`} to={href}>{anchorText}</Link>
  )
}
import Icon from "./Icon";

type LabelProps = {
    labelText: string;
    onClick?: () => void;
    variant: "default" | "grey";
  }

export default function Label({
    labelText,
    onClick,
    variant
}: LabelProps) {

  const variantClasses = {
    default: "bg-blue text-white text-sm ",
    grey: "bg-grey text-blue text-base",

  };

  return (
    <div className={`font-bold w-fit flex justify-around rounded items-center gap-3 py-1 px-3 ${variantClasses[variant]}`}>{labelText}
    {variant === 'default' &&
<Icon onClick={onClick} variant="closeIconWhite" />
}
    </div>
  )
}
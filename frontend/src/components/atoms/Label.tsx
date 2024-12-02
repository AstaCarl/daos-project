import Icon from "./Icon";

type Props = {
    labelText: string;
    onClick?: () => void;
}

export default function Label({
    labelText,
    onClick
}: Props) {
  return (
    <div className="bg-blue text-sm font-bold text-white w-fit flex justify-around rounded items-center gap-3 py-1 px-3">{labelText}
<Icon onClick={onClick} variant="closeIconWhite" />
    </div>
  )
}
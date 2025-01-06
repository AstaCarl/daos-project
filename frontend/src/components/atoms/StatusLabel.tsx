import Icon from "./Icon";
import Paragraf from "./Paragraf";

// component for displaying user status labels

type Props = {
  labelText: string | number;
  varient: "true" | "false";
};

export default function StatusLabel({ labelText, varient }: Props) {
  return varient === "true" ? (
    <div className="flex justify-between px-2">
      <Paragraf variant="body-grey" paragrafText={labelText} />
      <div className="pr-[2px]">
      <Icon variant="checkIcon" />
      </div>
    </div>
  ) : varient === "false" ? (
    <div className="flex justify-between px-2">
      <Paragraf variant="body" paragrafText={labelText} />
      <div className="flex size-6">
      <Icon variant="checkIconFalse" />
      </div>
    </div>
  ) : null;
}

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
      <Icon variant="checkIcon" />
    </div>
  ) : varient === "false" ? (
    <div className="flex justify-between px-2">
      <Paragraf variant="body" paragrafText={labelText} />
    </div>
  ) : null;
}

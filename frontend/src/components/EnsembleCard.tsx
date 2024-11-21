import Image from "./atoms/Image";
import Subtitle from "./atoms/Subtitle";

type Props = {
    title: string;
}

export default function EnsembleCard({title}: Props) {
  return (
    <div className="border border-border-gray shadow-md rounded-lg flex flex-col gap-3">
    <Image className="rounded-t-md" />
    <div className="px-4 pb-4">
    <Subtitle variant="cardTitle" subtitle={title}/>
    </div>
    </div>
  )
}
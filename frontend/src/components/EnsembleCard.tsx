import Image from "./atoms/Image";
import Paragraf from "./atoms/Paragraf";
import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";

type Props = {
  title: string;
  description: string;
  zipcode: string;
  city: string;
  activeUsers: number;
  href?: string;
};

export default function EnsembleCard({
  title,
  description,
  zipcode,
  city,
  activeUsers,
  href,
}: Props) {
  return (
    <div className="border border-border-grey shadow-md rounded-lg flex flex-col gap-3">
      <Image className="rounded-t-md" />
      <div className="px-4 pb-4 flex flex-col gap-2">
        <Subtitle variant="cardTitle" subtitle={title} />
        <div className="flex gap-2">
          <Paragraf variant="body-small-red" paragrafText={zipcode} />
          <Paragraf variant="body-small-red" paragrafText={city} />
        </div>
        <Paragraf variant="body-small" paragrafText={description} />
        <div className="flex justify-between items-end">
          <div>
            <Paragraf
              variant="body-small-red"
              paragrafText="Aktive musikkere"
            />
            <Paragraf variant="body-small" paragrafText={activeUsers} />
          </div>
          <div>
            <Button
              href={href}
              variant="secondary"
              buttonText="Læs mere"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

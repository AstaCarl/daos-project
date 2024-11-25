import Icon from "./atoms/Icon";
import Paragraf from "./atoms/Paragraf";
import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";

type Props = {
  buttonText: string;
  paragrafText: string;
  subtitle: string;
  smallButtonText?: string;
  onClick?: () => void;
  handleToggleEnsembleForm?: () => void;
};

export default function ActionCard({
  buttonText,
  paragrafText,
  subtitle,
  smallButtonText,
  onClick,
}: Props) {
  return (
    <section className="bg-white  flex flex-col items-center gap-2 w-full padding border-y border-border-gray">
      <div className="flex justify-between w-full">
        <Subtitle subtitle={subtitle} variant="default" />
        <Button
          variant="secondary"
          buttonText={smallButtonText}
          size="small"
        />
      </div>
      <Icon variant="postsEmpty" />
      <Subtitle subtitle="Du har ingen ensembler" variant="default" />
      <div className="flex flex-col gap-4">
        <Paragraf
          className="text-center"
          paragrafText={paragrafText}
          variant="body"
        />
        <Button
          variant="primary"
          buttonText={buttonText}
          size="medium"
          onClick={onClick}
        />
      </div>
    </section>
  );
}
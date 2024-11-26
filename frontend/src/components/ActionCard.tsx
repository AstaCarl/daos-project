import Icon from "./atoms/Icon";
import Paragraf from "./atoms/Paragraf";
import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";

type Props = {
  buttonTextCreate: string;
  buttonTextRegister: string;
  paragrafText: string;
  subtitle: string;
  onClickCreate: () => void;
  onClickRegister: () => void;
};

export default function ActionCard({
  buttonTextCreate,
  buttonTextRegister,
  paragrafText,
  subtitle,
  onClickCreate,
  onClickRegister,
}: Props) {
  return (
    <section className="bg-white  flex flex-col items-center gap-2 w-full padding border-y accent-grey">
      <div className="flex justify-between w-full">
        <Subtitle subtitle={subtitle} variant="default" />
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
          buttonText={buttonTextCreate}
          size="medium"
          onClick={onClickCreate}
        />
                <Button
          variant="secondary"
          buttonText={buttonTextRegister}
          size="medium"
          onClick={onClickRegister}
        />
      </div>
    </section>
  );
}
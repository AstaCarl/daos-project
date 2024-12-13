import Icon from "./atoms/Icon";
import Paragraf from "./atoms/Paragraf";
import Subtitle from "./atoms/Subtitle";

export function FeedbackCard() {
  return (
    <div className="flex overflow-x-auto space-x-4">
      <div className="flex min-w-[300px] max-w-[300px]">
        <div className="flex flex-col bg-white rounded-lg my-2 py-4 px-4">
          <div>
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex py-2 justify-center text-center">
            <Paragraf
              variant="body"
              paragrafText="Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!"
            />
          </div>
          <div className="flex justify-end">
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex flex-col justify-center items-center pt-4 gap-2">
            <div className="flex w-[15%]">
              <Icon variant="userIconMikkel" />
            </div>
            <div>
              <Subtitle variant="red" subtitle="Mikkel" />
            </div>
            <div>
              <Paragraf
                variant="body-small"
                paragrafText="Fra Kvartetten Klassisk Amok"
              />
            </div>
          </div>
        </div>
      </div>

      {/* second card */}
      <div className="flex min-w-[300px] max-w-[300px]">
        <div className="flex flex-col bg-white rounded-lg my-2 py-4 px-4">
          <div>
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex py-2 justify-center text-center">
            <Paragraf
              variant="body"
              paragrafText="Vi stod overfor at mangle både en trompetist og en fløjteist til vores nytårskoncert - men med Musik Samspil fandt vi assistenter i løbet at få timer!"
            />
          </div>
          <div className="flex justify-end">
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex flex-col justify-center items-center pt-4 gap-2">
            <div className="flex w-[15%]">
              <Icon variant="userIconKaren" />
            </div>
            <div>
              <Subtitle variant="red" subtitle="Karen" />
            </div>
            <div>
              <Paragraf
                variant="body-small"
                paragrafText="Koordinator i VirumOrkestret"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

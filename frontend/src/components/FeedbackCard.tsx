import Icon from "./atoms/Icon";
import Paragraf from "./atoms/Paragraf";
import Subtitle from "./atoms/Subtitle";

// feedback card for the feedback section on front page

// props for the feedback card, to display the info from the feedback array
type props = {
  feedbackText: string;
  ensemble: string;
  userName: string;
  userIcon: any;
}

export function FeedbackCard({feedbackText, ensemble, userIcon, userName}: props) {
  return (
      <div className="flex min-w-[300px] max-w-[300px]">
        <div className="flex flex-col bg-white rounded-lg my-2 py-4 px-4">
          <div>
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex py-2 justify-center text-center">
            <Paragraf
              variant="body"
              paragrafText={feedbackText}
            />
          </div>
          <div className="flex justify-end">
            <Icon variant="quoteIcon" />
          </div>
          <div className="flex flex-col justify-center items-center pt-4 gap-2">
            <div className="flex w-[15%]">
              <Icon variant={userIcon} />
            </div>
            <div>
              <Subtitle variant="red" subtitle={userName} />
            </div>
            <div>
              <Paragraf
                variant="body-small"
                paragrafText={ensemble}
              />
            </div>
          </div>
        </div>
      </div>
  );
}

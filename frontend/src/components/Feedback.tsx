import { Title } from "./atoms/Title";
import { FeedbackCard } from "./FeedbackCard";

export function Feedback() {
  return (
    <div className="bg-blue flex flex-col mx-[-16px] px-4 py-2">
        <div className="flex py-4">
        <Title variant="white" title="Det siger vores brugere" />
      </div>
      <FeedbackCard />
    </div>
  );
}

import { Title } from "./atoms/Title";
import { FeedbackCard } from "./FeedbackCard";

// feedback section on frontpage, (hardcoded data)

export function Feedback() {

  // array of feedback objects
  const feedback = [
    {
      feedbackText:
        "Musik Samspil hjalp os med at finde sammen. Først var det meningen, at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at nu mødes vi hver anden uge!",
      userName: "Mikkel",
      ensemble: "Kvartetten Klassisk Amok",
      userIcon: "userIconMikkel",
    },
    {
      feedbackText:
        "Vi stod overfor at mangle både en trompetist og en fløjteist til vores nytårskoncert - men med Musik Samspil fandt vi assistenter i løbet at få timer!",
      userName: "Karen",
      ensemble: "Koordinator i VirumOrkestret",
      userIcon: "userIconKaren",
    },
  ];

  return (
    <div className="bg-blue flex flex-col mx-[-16px] px-4 py-2">
      <div className="flex py-4">
        <Title variant="white" title="Det siger vores brugere" />
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {/* Mapping the feedback objects to the feedback card */}
        {feedback.map((feedback) => (
          <FeedbackCard
            feedbackText={feedback.feedbackText}
            userIcon={feedback.userIcon}
            userName={feedback.userName}
            ensemble={feedback.ensemble}
          />
        ))}
      </div>
    </div>
  );
}

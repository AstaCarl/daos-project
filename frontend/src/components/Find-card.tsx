import { useNavigate } from "react-router-dom";
import { Button } from "./atoms/Button";
import Icon from "./atoms/Icon";

// Component for layout of the buttons that handles search for musicians and ensembles

export default function FindCard() {
  // useNavigate hook for navigation
  const navigate = useNavigate();

// handle button click to navigate to find-musician page
  const handleButtonClick = () => {
    navigate('/find-musician');
  };

  return (
    <div className="flex justify-between gap-4 px-2">
      <Button
        buttonText="Find musiker"
        variant="iconButton"
        size="medium"
        onClick={handleButtonClick}
      >
        <Icon variant="musicUserIcon" />
      </Button>
      <Button
        buttonText="Find ensemble"
        variant="iconButton"
        size="medium"
      >
        <Icon variant="instrumentIcon" />
      </Button>
    </div>
  );
}

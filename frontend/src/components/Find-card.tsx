import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import { Button } from "./atoms/Button";
import Icon from "./atoms/Icon";

export default function FindCard() {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      alert("Du skal være logget ind for at finde musikere");
    } else {
      navigate('/find-musician');
    }
  }

  return (
    <div className="flex justify-between gap-4 pb-[80px] px-2">
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
        <Icon variant="musicUserIcon" />
      </Button>
    </div>
  );
}

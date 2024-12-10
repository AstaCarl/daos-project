import { UserIcon } from "./atoms/UserIcon";
import { Button } from "./atoms/Button";
import Paragraf from "./atoms/Paragraf";
import { Title } from "./atoms/Title";
import useAuthStore from "../hooks/store/auth-store";

type Props = {
  handleSettingsOpen: () => void;
}

export default function ProfileHeader({ handleSettingsOpen }: Props) {
  const { user } = useAuthStore();

  const userName = user.name;
  const userLastname = user.lastname;
  const createdAt = user.createdAt;
  const date = new Date(createdAt);
  const month = date.toLocaleString("da-DK", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="flex py-[30px] flex-col items-center w-full bg-white padding gap-5 border-y accent-grey">
      <div className="flex items-center w-full justify-between">
        <div className="flex w-[22%]">
          <UserIcon />
        </div>
        <div className="flex flex-col w-[70%]">
          <div>
            <Title variant="red" title={`${userName} ${userLastname}`} />
          </div>
          <div>
            <Paragraf
              variant="body-small"
              paragrafText={`Medlem siden ${month} ${year}`}
            />
          </div>
        </div>
      </div>

      <div className="flex item-center justify-start gap-3 w-full">
        <Button variant="secondary" buttonText="Rediger profil" size="small" />
        <Button variant="secondary" buttonText="Indstillinger" size="small" onClick={handleSettingsOpen} />
      </div>
    </div>
  );
}

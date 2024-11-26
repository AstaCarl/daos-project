import { UserIcon } from "./atoms/UserIcon";
import { Button } from "./atoms/Button";
import Paragraf from "./atoms/Paragraf";
import { Title } from "./atoms/Title";
import useAuthStore from "../hooks/store/auth-store";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  const userName = user.name;
  const userLastname = user.lastname;

  return (
    <div className="flex py-[30px] flex-col items-center w-full bg-white padding gap-5 border-y border-border-grey">
      <div className="flex items-center w-full justify-between">
        <div className="flex w-[22%]">
          <UserIcon />
        </div>
        <div className="flex flex-col w-[70%]">
          <div>
            <Title variant="red" title={`${userName} ${userLastname}`} />
          </div>
          <div className="">
            <Paragraf
              variant="body-small"
              paragrafText="Medlem siden maj 2020"
            />
            <Paragraf
              variant="body-small"
              paragrafText="Sidst logget ind 1 time siden"
            />
          </div>
        </div>
      </div>

      <div className="flex item-center justify-start gap-3 w-full">
        <Button
          variant="secondary"
          buttonText="Rediger profil"
          size="small"
        />
        <Button
          variant="secondary"
          buttonText="Indstillinger"
          size="small"
        />
      </div>
    </div>
  );
}

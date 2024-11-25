import { UserIcon } from "./atoms/UserIcon";
import { PrimaryButton } from "./atoms/PrimaryButton";
import Paragraf from "./atoms/Paragraf";
import { Title } from "./atoms/Title";

export default function ProfileHeader() {
  if (!localStorage.getItem("user")) {
    return null;
  }
  const user = JSON.parse(localStorage.getItem("user") || "");
  const userName = user.name;
  const userLastname = user.lastname;
  console.log(user);

  return (
    <div className="flex py-[30px] flex-col items-center w-full bg-white padding gap-5 border-y border-border-gray">
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
        <PrimaryButton
          variant="secondary"
          buttonText="Rediger profil"
          size="small"
        />
        <PrimaryButton
          variant="secondary"
          buttonText="Indstillinger"
          size="small"
        />
      </div>
    </div>
  );
}

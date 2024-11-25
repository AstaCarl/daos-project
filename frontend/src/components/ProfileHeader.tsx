import { UserIcon } from "./atoms/UserIcon";
import { PrimaryButton } from "./atoms/PrimaryButton";

export default function ProfileHeader() {
  if (!localStorage.getItem("user")) {
    return null;
  }
  const user = JSON.parse(localStorage.getItem("user") || "");
  const userName = user.name;
  const userLastname = user.lastname;
  console.log(user);

  return (
    <div className="flex flex-col items-center w-full bg-white pb-[24px]">
      <div className="flex items-center">
        <div className="flex pl-2">
          <UserIcon />
        </div>
        <div className="flex flex-col pl-[20px]">
          <div>
            <h1 className="font-display font-medium text-red text-xl">
              {userName} {userLastname}
            </h1>
          </div>
          <div className="flex">
            <p>
              Medlem siden maj 2020 <br />
              Sidst logget ind 1 time siden
            </p>
          </div>
        </div>
      </div>

      <div className="flex item-center pt-[20px] gap-[21px]">
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

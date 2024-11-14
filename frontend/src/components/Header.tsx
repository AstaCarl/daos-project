import Anchor from "./atoms/Anchor";
import { Logo } from "./atoms/Logo";
import { PrimaryButton } from "./atoms/PrimaryButton";
import Icon from "./atoms/Icon";

type Props = {};

export default function Header({}: Props) {
  return (
    <>
      <div className="flex justify-between items-center bg-white border border-gray h-20 w-full py-[12px] px-[19px]">
        <div>
          <Logo />
        </div>
        <div>
          <ul className="hidden items-center sans-bold ">
            <li>
              <Anchor href="/" anchorText="Hjem" variant="navigation" />
            </li>
            <li>
              <Anchor href="/" anchorText="Find musiker" variant="navigation" />
            </li>
            <li>
              <Anchor
                href="/"
                anchorText="Find ensemble"
                variant="navigation"
              />
            </li>
            <li>
              <Anchor href="/" anchorText="Profil" variant="navigation" />
            </li>
            {PrimaryButton({ buttonText: "Opret bruger", type: "button" })}
            {PrimaryButton({ buttonText: "Log ind", type: "button" })}
          </ul>
        </div>
        <Icon variant="burger" />
      </div>
    </>
  );
}

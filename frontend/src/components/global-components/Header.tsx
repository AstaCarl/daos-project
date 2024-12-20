import Anchor from "../atoms/Anchor";
import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import Icon from "../atoms/Icon";
import { useState } from "react";
import useAuthStore from "../../hooks/store/auth-store";
// import ProfileIcon from "../assets/profile-icon.png";

type Props = {};

export default function Header({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();

  const toggleMenu = () => {
    console.log("toggleMenu");
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white border border-grey h-20 w-full py-[12px] px-[19px]">
        <div>
          <Logo />
        </div>
        <div>
          <ul
            className={`absolute w-full top-20  flex flex-col gap-3 items-center transform transition:transition bg-white ${
              isMenuOpen ? "opacity-100 h-fit z-10 pt-[32px] pb-[24px] left-0" : "opacity-0 h-0 p-0"
            }`}
          >
            <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
              <Anchor href="/" anchorText="Hjem" variant="navigation" />
            </li>
            <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
              <Anchor href="#" anchorText="Find musiker" variant="navigation" />
            </li>
            <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
              <Anchor
                href="#"
                anchorText="Find ensemble"
                variant="navigation"
              />
            </li>
            <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
              <Anchor
                href="/profile"
                anchorText="Profil"
                variant="navigation"
              />
            </li>
            {!isLoggedIn ? (
              <>
                <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block pb-3" : "hidden"}`}>
                  <Button
                    buttonText="Opret bruger"
                    variant="primary"
                    type="button"
                    href="/register"
                  />
                </li>
                <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
                  <Button
                    buttonText="Log ind"
                    variant="secondary"
                    type="button"
                    href="/login"
                  />
                </li>
              </>
            ) : (
              <>
                <li onClick={handleCloseMenu} className={`${isMenuOpen ? "block" : "hidden"}`}>
                  <Button
                    buttonText="Log ud"
                    variant="primary"
                    type="button"
                    onClick={handleLogout}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
        {isMenuOpen ? (
          <Icon onClick={toggleMenu} variant="close" />
        ) : (
          <Icon onClick={toggleMenu} variant="burger" />
        )}
      </div>
    </>
  );
}

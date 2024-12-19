import Anchor from "../atoms/Anchor";
import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import Icon from "../atoms/Icon";
import { useState } from "react";
import useAuthStore from "../../hooks/store/auth-store";

// Header component

export default function Header({}) {
  // state for toggling menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // get logout from useAuthStore
  const { logout, accessToken } = useAuthStore();

  // function for toggling menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // function for closing menu
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  // handle logout function
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
              isMenuOpen
                ? "opacity-100 h-fit z-10 pt-[32px] pb-[24px] left-0"
                : "opacity-0 h-0 p-0"
            }`}
          >
            <li
              onClick={handleCloseMenu}
              className={`${isMenuOpen ? "block" : "hidden"}`}
            >
              <Anchor href="/" anchorText="Hjem" variant="navigation" />
            </li>
            <li
              onClick={handleCloseMenu}
              className={`${isMenuOpen ? "block" : "hidden"}`}
            >
              <Anchor
                href="/find-musician"
                anchorText="Find musiker"
                variant="navigation"
              />
            </li>
            <li
              onClick={handleCloseMenu}
              className={`${isMenuOpen ? "block" : "hidden"}`}
            >
              <Anchor
                href="#"
                anchorText="Find ensemble"
                variant="navigation"
              />
            </li>
            <li
              onClick={handleCloseMenu}
              className={`${isMenuOpen ? "block" : "hidden"}`}
            >
              <Anchor
                href="/profile"
                anchorText="Profil"
                variant="navigation"
              />
            </li>
            {!accessToken ? (
              <>
                <li
                  onClick={handleCloseMenu}
                  className={`${isMenuOpen ? "block pb-3" : "hidden"}`}
                >
                  <Anchor
                    href="/login"
                    anchorText="Log ind"
                    variant="buttonPrimary"
                  />
                </li>
                <li
                  onClick={handleCloseMenu}
                  className={`${isMenuOpen ? "block" : "hidden"}`}
                >
                  <Anchor
                    href="/register"
                    anchorText="Opret bruger"
                    variant="buttonSecondary"
                  />
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={handleCloseMenu}
                  className={`${isMenuOpen ? "block" : "hidden"}`}
                >
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

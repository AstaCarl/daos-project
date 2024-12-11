import facebookIcon from "../../assets/footer-facebook.svg";
import instagramIcon from "../../assets/footer-instagram.svg";
import linkedInIcon from "../../assets/footer-linkedin.svg";
import burgerIcon from "../../assets/icons8-menu.svg";
import closeIcon from "../../assets/close-icon.svg";
import closeIconWhite from "../../assets/close-icon-white.svg";
import showPasswordIcon from "../../assets/show-password.svg";
import postsEmptyIcon from "../../assets/posts-empty.svg";
import userIcon from "../../assets/user-icon.svg";
import checkIcon from "../../assets/check-icon.svg";
import musicUserIcon from "../../assets/music-user-icon.png";
import deleteIcon from "../../assets/delete-icon.svg";

type Props = {
  onClick?: (myInstrumentId?: string) => void;
  myInstrumentId?: string;
  variant:
    | "facebook"
    | "instagram"
    | "linkedIn"
    | "burger"
    | "close"
    | "showPassword"
    | "postsEmpty"
    | "userIcon"
    | "closeIconWhite"
    | "checkIcon"
    | "musicUserIcon"
    | "deleteIcon";
};

export default function Icon({ variant, onClick, myInstrumentId }: Props) {
  const variantIcon = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    linkedIn: linkedInIcon,
    burger: burgerIcon,
    close: closeIcon,
    showPassword: showPasswordIcon,
    postsEmpty: postsEmptyIcon,
    userIcon: userIcon,
    closeIconWhite: closeIconWhite,
    checkIcon: checkIcon,
    musicUserIcon: musicUserIcon,
    deleteIcon: deleteIcon,
  };
  const handleClick = () => {
    if (onClick) {
      onClick(myInstrumentId);
    }
  };

  return (
    <div onClick={handleClick}>
      <img src={variantIcon[variant]} alt="" />
    </div>
  );
}

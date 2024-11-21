import facebookIcon from "../../assets/footer-facebook.svg";
import instagramIcon from "../../assets/footer-instagram.svg";
import linkedInIcon from "../../assets/footer-linkedin.svg";
import burgerIcon from "../../assets/icons8-menu.svg";
import closeIcon from "../../assets/close-icon.svg";
import showPasswordIcon from "../../assets/show-password.svg";
import postsEmptyIcon from "../../assets/posts-empty.svg";

type Props = {
  onClick?: () => void;
  variant:
    | "facebook"
    | "instagram"
    | "linkedIn"
    | "burger"
    | "close"
    | "showPassword"
    | "postsEmpty";
};

export default function Icon({ variant, onClick }: Props) {
  const variantIcon = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    linkedIn: linkedInIcon,
    burger: burgerIcon,
    close: closeIcon,
    showPassword: showPasswordIcon,
    postsEmpty: postsEmptyIcon,
  };
  return (
    <div onClick={onClick} className="">
      <img src={variantIcon[variant]} alt="" />
    </div>
  );
}

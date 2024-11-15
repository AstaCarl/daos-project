import facebookIcon from "../../assets/footer-facebook.svg";
import instagramIcon from "../../assets/footer-instagram.svg";
import linkedInIcon from "../../assets/footer-linkedin.svg";
import burgerIcon from "../../assets/icons8-menu.svg";

type Props = {
  variant: "facebook" | "instagram" | "linkedIn" | "burger";
  onClick?: () => void;
};

export default function Icon({ variant, onClick }: Props) {
  const variantIcon = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    linkedIn: linkedInIcon,
    burger: burgerIcon,
  };
  return (
    <div onClick={onClick} className="">
      <img src={variantIcon[variant]} alt="" />
    </div>
  );
}

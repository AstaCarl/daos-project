import ProfileIcon from "../assets/profile-icon.png";

type Props = {
  variant: "profileIcon";
};

export default function Icon({ variant }: Props) {
  const variantIcon = {
    profileIcon: ProfileIcon,
  };
  return (
    <div className="bg-grey rounded-full">
      <img className="item-center p-3" src={variantIcon[variant]} alt="" />
    </div>
  );
}

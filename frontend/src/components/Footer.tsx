import Anchor from "./atoms/Anchor";
import Icon from "./atoms/Icon";
import Subtitle from "./atoms/Subtitle";
import musicIcon from "../assets/footer-music.svg";

export default function Footer({}) {
  return (
    <footer className="bg-red flex flex-col gap-6 py-7 ps-3">
      <Subtitle variant="footer" subtitle="Musik samspil" />
      <div className="flex flex-col gap-2">
        <Anchor href="/" anchorText="Hjem" variant="footer" />
        <Anchor href="#" anchorText="Find Musiker" variant="footer" />
        <Anchor href="#" anchorText="Find Ensemble" variant="footer" />
        <Anchor href="/profile" anchorText="Profil" variant="footer" />
      </div>
      <div className="flex gap-4">
        <Icon variant="facebook" />
        <Icon variant="instagram" />
        <Icon variant="linkedIn" />
      </div>
      <div className="flex justify-center">
        <img src={musicIcon} />
      </div>
    </footer>
  );
}

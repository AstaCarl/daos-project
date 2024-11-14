import Anchor from "./atoms/Anchor"
import Icon from "./atoms/Icon"
import Subtitle from "./atoms/Subtitle"
import musicIcon from '../assets/footer-music.svg'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="bg-red flex flex-col gap-6 pt-7 ps-3 pb-7">
        <Subtitle variant="footer" subtitle="Musik samspil" />
        <div className="flex flex-col gap-2">
        <Anchor href="/about" anchorText="Hjem" variant="footer" />
        <Anchor href="/about" anchorText="Find Musiker" variant="footer" />
        <Anchor href="/about" anchorText="Find Ensemble" variant="footer" />
        <Anchor href="/about" anchorText="Profil" variant="footer" />
        </div>
        <div className="flex gap-4">
        <Icon variant="facebook" />
        <Icon variant="instagram" />
        <Icon variant="linkedIn" />
        </div>
        <div className="flex justify-center">
        <img className="" src={musicIcon} alt="" />
        </div>
    </footer>
  )
}
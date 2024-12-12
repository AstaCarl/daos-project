import defaultImage from '../../assets/default-img.png';

type Props = {
    className?: string;
}

export default function Image({className}: Props) {
  return (
    <img className={className} src={defaultImage} />
  )
}

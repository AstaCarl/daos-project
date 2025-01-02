import defaultImage from '../../assets/default-img.png';

// component for displaying a default image

type Props = {
    className?: string;
}

export default function Image({className}: Props) {
  return (
    <img className={className} src={defaultImage} />
  )
}

type Props = {
    variant: 'body' | 'body-small' | 'body-small-red';
    paragrafText: string | number;
    children?: React.ReactNode;
    className?: string;
}

export default function Paragraf({variant, paragrafText, children, className}: Props) {
    const variantClasses = {
        body: 'text-base text-dark-grey',
        'body-small': 'text-sm text-dark-grey',
        'body-small-red': 'text-sm text-red font-bold'
    }
  return (
    <p className={`font-sans ${variantClasses[variant]} ${className}`}>{paragrafText}{children}</p>
  )
}
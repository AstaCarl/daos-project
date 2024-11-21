type Props = {
    variant: 'body' | 'body-small';
    paragrafText: string;
    children?: React.ReactNode;
    className?: string;
}

export default function Paragraf({variant, paragrafText, children, className}: Props) {
    const variantClasses = {
        body: 'text-base',
        'body-small': 'text-sm'
    }
  return (
    <p className={`font-sans text-dark-grey ${variantClasses[variant]} ${className}`}>{paragrafText}{children}</p>
  )
}
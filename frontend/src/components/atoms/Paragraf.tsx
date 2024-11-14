type Props = {
    variant: 'body' | 'body-small';
    paragrafText: string;
    children?: React.ReactNode;
}

export default function Paragraf({variant, paragrafText, children}: Props) {
    const variantClasses = {
        body: 'text-base',
        'body-small': 'text-sm'
    }
  return (
    <p className={`font-sans text-dark-grey ${variantClasses[variant]}`}>{paragrafText}{children}</p>
  )
}
type Props = {
    variant: 'default' | 'footer';
    subtitle: string;
}

export default function Subtitle({variant, subtitle}: Props) {
    const variantClasses = {
        default: 'font-sans text-dark-grey text-lg',
        footer: 'font-display uppercase font-[500] text-white text-xl'
    }
  return (
    <h2 className={variantClasses[variant]}>{subtitle}</h2>
  )
}
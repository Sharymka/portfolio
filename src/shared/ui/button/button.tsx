import type { ElementType, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  as: Component = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <Component
      className={[styles.button, variantClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}

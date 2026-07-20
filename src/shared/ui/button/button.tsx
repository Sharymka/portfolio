import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <button
      className={[styles.button, variantClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

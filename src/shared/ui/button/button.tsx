import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: ButtonVariant;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';
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

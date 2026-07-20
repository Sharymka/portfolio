import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './container.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={[styles.container, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Component>
  );
}

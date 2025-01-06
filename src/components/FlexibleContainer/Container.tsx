import styles from './style.module.less';

export function Container(props: {
  direction?: 'vertical' | 'horizontal';
  className?: string;
  children: React.ReactNode;
}) {
  const { direction = 'horizontal', className, children } = props;
  return (
    <div
      className={`${styles['container']} ${
        direction === 'vertical' && styles['container-vertical']
      } ${
        direction === 'horizontal' && styles['container-horizontal']
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ContainerFixed(props: {
  className?: string;
  children: React.ReactNode;
}) {
  const { className, children } = props;
  return (
    <div
      className={`${styles['container-fixed']} container-fixed ${className}`}
    >
      {children}
    </div>
  );
}

export function ContainerShrink(props: {
  className?: string;
  children: React.ReactNode;
}) {
  const { className, children } = props;
  return (
    <div
      className={`${styles['container-shrink']} container-shrink ${className}`}
    >
      {children}
    </div>
  );
}

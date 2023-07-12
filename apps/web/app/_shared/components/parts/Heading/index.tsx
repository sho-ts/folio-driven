import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type AllowElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'dt' | 'p' | 'div';

type Props<T extends AllowElements> = {
  as?: T;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
  bold?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Heading = <T extends AllowElements = 'h2'>({ as: tag, className, bold, size = 'md', ...props }: Props<T>) => {
  const Tag = tag || 'h2';

  return (
    <Tag
      {...props}
      className={clsx(
        {
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
          'text-3xl': size === 'xl',
          bold: bold,
        },
        'border-b border-neutral-200 pb-2',
        className,
      )}
    />
  );
};

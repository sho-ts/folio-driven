import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends ElementType | FC> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  fill?: boolean;
} & ComponentPropsWithRef<T>;

export const Button = <T extends ElementType | FC = 'button'>({ as: tag, fill, children, className, ...props }: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag
      {...props}
      className={clsx(
        'items-centerjustify-center inline-flex rounded bg-gradient-to-r from-sky-300 to-sky-400 px-6 py-2 text-white transition duration-300 ease-in-out hover:opacity-80',
        fill && 'flex w-full ',
        className,
      )}
    >
      {children}
    </Tag>
  );
};

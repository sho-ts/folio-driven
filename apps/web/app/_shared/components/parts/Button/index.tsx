import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends ElementType | FC> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fill?: boolean;
} & ComponentPropsWithRef<T>;

export const Button = <T extends ElementType | FC = 'button'>({
  as: tag,
  fill,
  children,
  className,
  disabled,
  ...props
}: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag
      {...props}
      className={clsx(
        'inline-flex items-center justify-center rounded px-6 py-2 transition-opacity duration-300 ease-in-out hover:opacity-80',
        !disabled
          ? 'bg-gradient-to-r from-sky-300 to-sky-400 text-white'
          : 'bg-gray-200 text-gray-300',
        fill && 'flex w-full',
        className,
      )}
    >
      {children}
    </Tag>
  );
};

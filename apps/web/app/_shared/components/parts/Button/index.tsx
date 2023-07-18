import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends ElementType | FC> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fill?: boolean;
  outline?: boolean;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const Button = <T extends ElementType | FC = 'button'>({
  as: tag,
  fill,
  children,
  className,
  disabled,
  outline,
  ...props
}: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag
      {...props}
      className={clsx(
        {
          'bg-gradient-to-r from-sky-300 to-sky-400 text-white': !disabled && !outline,
          'bg-white text-sky-400 border border-sky-400': !disabled && outline,
          'bg-gray-200 text-gray-300': disabled,
        },
        {
          'flex w-full': fill,
        },
        'inline-flex items-center justify-center rounded px-6 py-2 transition-opacity duration-300 ease-in-out hover:opacity-80',
        className,
      )}
    >
      {children}
    </Tag>
  );
};

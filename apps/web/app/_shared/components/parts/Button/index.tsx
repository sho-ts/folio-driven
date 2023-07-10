import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends ElementType | FC> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  fill?: boolean;
} & ComponentPropsWithRef<T>;

export const Button = <T extends ElementType | FC = 'button'>({ as: tag, fill, children, clasName, ...props }: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag {...props} className={clsx('rounded py-2 px-6 bg-gradient-to-r from-sky-300 to-sky-400 text-white inline-flex items-center justify-center transition duration-300 ease-in-out hover:opacity-80', fill && 'flex w-full ', clasName)}>
      {children}
    </Tag>
  );
};

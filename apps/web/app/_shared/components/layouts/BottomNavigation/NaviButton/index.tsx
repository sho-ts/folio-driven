'use client';

import { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends FC | ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithRef<T>, 'as' | 'className'>;

export const NavButton = <T extends FC | ElementType = 'button'>({
  as: tag,
  children,
  ...props
}: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag className='flex h-full flex-1 items-center justify-center' {...props}>
      {children}
    </Tag>
  );
};

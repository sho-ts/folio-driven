'use client';

import { ComponentPropsWithRef, ElementType, FC } from 'react';

type Props<T extends FC | ElementType> = {
  as?: T;
  children?: React.ReactNode;
  label?: string;
} & Omit<ComponentPropsWithRef<T>, 'as' | 'className'>;

export const NavButton = <T extends FC | ElementType = 'button'>({
  as: tag,
  children,
  label,
  ...props
}: Props<T>) => {
  const Tag = tag || 'button';

  return (
    <Tag className='flex h-full flex-1 items-center justify-center md:flex-none md:h-auto gap-4' {...props}>
      {children}
      <span className='hidden xl:block'>{label}</span>
    </Tag>
  );
};

import { ComponentPropsWithoutRef } from 'react';

type Props = {
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'form'>, 'className'>;

export const AuthenticationForm = (props: Props) => {
  return <form {...props} className='mx-auto flex w-full flex-col items-center gap-6' />;
};

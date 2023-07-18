import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export const Form = forwardRef<HTMLFormElement, ComponentPropsWithoutRef<'form'>>(function Form(
  { className, ...props },
  ref,
) {
  return (
    <form
      className={clsx('flex w-full flex-col items-center gap-6', className)}
      {...props}
      ref={ref}
    />
  );
});

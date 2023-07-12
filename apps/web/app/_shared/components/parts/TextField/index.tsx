import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './TextField.module.scss';

type BaseProps = {
  rows?: number;
  className?: string;
  fill?: boolean;
  placeholder?: string;
  error?: boolean;
};

type GenericComponentProps<T> = T extends number
  ? Omit<ComponentPropsWithoutRef<'textarea'>, 'children' | 'cols'>
  : Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'type'> & {
      type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
    };

type Props<T extends number | undefined> = BaseProps & {
  rows?: T;
} & GenericComponentProps<T>;

export const TextField = forwardRef<any, BaseProps>(function TextField(
  { className, fill, placeholder, error, ...props },
  ref,
) {
  const Body = props.rows ? 'textarea' : 'input';

  return (
    <div className={clsx('relative inline-flex', fill && 'flex w-full', className)}>
      <Body
        ref={ref}
        placeholder={placeholder}
        className={clsx(
          'block w-full resize-none rounded-t-md border-b border-solid border-neutral-200 px-4 pb-1 pt-6 outline-none transition duration-300 ease-in-out focus:border-sky-500',
          !error ? 'bg-slate-50' : 'border-red-200 bg-red-50 focus:border-red-500',
          styles.body,
        )}
        {...props}
      />
      <label className='pointer-events-none absolute left-4 top-3.5 flex origin-top-left text-slate-400 transition duration-300 ease-in-out'>
        {placeholder}
      </label>
    </div>
  );
}) as <T extends number | undefined = undefined>(
  props: Props<T>,
  ref: T extends number ? HTMLInputElement : HTMLTextAreaElement,
) => JSX.Element;

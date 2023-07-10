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
  ? Omit<ComponentPropsWithoutRef<'textarea'>,'children' | 'cols'>
  : Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'type'> & {
      type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
    };

type Props<T extends number | undefined> = BaseProps & {
  rows?: T;
} & GenericComponentProps<T>;

export const TextField = forwardRef<any, BaseProps>(function TextField({ className, fill, placeholder, error, ...props }, ref) {
  const Body = props.rows ? 'textarea' : 'input';

  return (
    <div className={clsx('relative inline-flex', fill && 'w-full flex', className)}>
      <Body
        ref={ref}
        placeholder={placeholder}
        data-classname="textfield-body"
        className={clsx(
          'resize-none border-b border-neutral-200 border-solid block px-4 pt-5 pb-1 outline-none focus:border-sky-500 transition duration-300 ease-in-out w-full block',
          error && 'bg-red-50 focus:border-red-500 border-red-200',
          styles.body
        )}
        {...props}
      />
      <label className="pointer-events-none text-slate-400 flex absolute top-5 left-4 transition duration-300 ease-in-out origin-top-left">{placeholder}</label>
    </div>
  );
}) as <T extends number | undefined = undefined>(props: Props<T>, ref: T extends number ? HTMLInputElement : HTMLTextAreaElement) => JSX.Element;

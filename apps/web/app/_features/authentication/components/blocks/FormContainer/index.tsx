type Props = {
  children?: React.ReactNode;
};

export const FormContainer = ({ children }: Props) => {
  return <div className='mx-auto w-full max-w-2xl'>{children}</div>;
};

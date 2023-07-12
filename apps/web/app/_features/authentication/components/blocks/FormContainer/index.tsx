type Props = {
  renderHeading?: () => JSX.Element;
  children?: React.ReactNode;
};

export const FormContainer = ({ children, renderHeading }: Props) => {
  return (
    <div className='mx-auto w-full max-w-2xl'>
      {renderHeading?.()}
      {children}
    </div>
  );
};

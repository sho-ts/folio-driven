type Props = {
  renderHeading?: () => JSX.Element;
  children?: React.ReactNode;
};

export const FormContainer = ({ children, renderHeading }: Props) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {renderHeading?.()}
      <div className="mx-auto w-full flex flex-col items-center gap-10">{children}</div>
    </div>
  );
};

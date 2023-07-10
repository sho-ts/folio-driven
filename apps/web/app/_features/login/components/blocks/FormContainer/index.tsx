type Props = {
  renderHeading?: () => JSX.Element;
  children?: React.ReactNode;
};

export const FormContainer = ({ children, renderHeading }: Props) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {renderHeading?.()}
      <div className="mx-auto w-full border border-neutral-200 rounded-md py-10 px-4 flex flex-col items-center gap-10 md:px-16">{children}</div>
    </div>
  );
};

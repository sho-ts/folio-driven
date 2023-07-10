type Props = {
  children?: React.ReactNode;
};

export const Main = ({ children }: Props) => {
  return <div className="max-w-7xl mx-auto w-full py-24 px-4 flex-1 flex flex-col">{children}</div>;
};

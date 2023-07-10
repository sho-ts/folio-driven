type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <div className="flex min-h-screen flex-col h-full">{children}</div>;
};

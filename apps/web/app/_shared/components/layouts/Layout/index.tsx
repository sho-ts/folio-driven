type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <div className='flex h-full min-h-screen flex-col'>{children}</div>;
};

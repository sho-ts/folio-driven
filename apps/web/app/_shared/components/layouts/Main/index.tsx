type Props = {
  children?: React.ReactNode;
};

export const Main = ({ children }: Props) => {
  return <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-24'>{children}</div>;
};

type Props = {
  children?: React.ReactNode;
};

export const Main = ({ children }: Props) => {
  return (
    <div className='md:pl-14'>
      <div className='mx-auto flex w-full max-w-4xl flex-1 flex-col px-2 py-24'>{children}</div>
    </div>
  );
};

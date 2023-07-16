type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <header>
      <nav className='fixed left-0 top-0 z-[5000] flex h-14 w-full items-center border-b border-solid border-neutral-200 bg-white px-4 md:left-14 xl:left-48 xl:pl-14'>
        <h1 className="mx-auto font-bold xl:mx-0 xl:text-lg">{title}</h1>
      </nav>
    </header>
  );
};

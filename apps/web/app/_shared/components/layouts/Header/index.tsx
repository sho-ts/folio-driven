import { UserInfo } from './UserInfo';

export const Header = () => {
  return (
    <header>
      <nav className='t-0 l-0 fixed z-[5000] flex h-14 w-full items-center border-b border-solid border-neutral-200 bg-white px-4'>
        <div className='mx-auto flex w-full max-w-7xl items-center'>
          <div className='text-lg font-bold text-sky-500'>FOLIO DRIVEN</div>
          <div className='ml-auto'>
            <UserInfo />
          </div>
        </div>
      </nav>
    </header>
  );
};

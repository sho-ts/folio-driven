'use client';

import { useMediaQuery } from '@/app/_shared/hooks';
import { authState } from '@/app/_shared/states/auth';
import { useRecoilValue } from 'recoil';
import { NavButton } from './NaviButton';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMail,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import Link from 'next/link';

export const BottomNavigation = () => {
  const isSmartPhone = useMediaQuery({ query: '(max-width: 767px)' });
  const { isLogin } = useRecoilValue(authState);

  if (!isSmartPhone || !isLogin) return null;

  return (
    <nav className='fixed bottom-0 left-0 z-[5000] flex h-14 w-full items-center justify-center border-t border-solid border-neutral-200 bg-white'>
      <NavButton as={Link} href='/'>
        <AiOutlineHome size={24} />
      </NavButton>
      <NavButton>
        <AiOutlineSearch size={24} />
      </NavButton>
      <NavButton>
        <AiOutlineAppstoreAdd size={24} />
      </NavButton>
      <NavButton>
        <AiOutlineMail size={24} />
      </NavButton>
      <NavButton>
        <AiOutlineUser size={24} />
      </NavButton>
    </nav>
  );
};

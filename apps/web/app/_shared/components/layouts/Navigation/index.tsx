'use client';

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
import { Fragment } from 'react';
import { Button } from '../../parts';

export const Navigation = () => {
  const { isLogin, isLoading } = useRecoilValue(authState);

  return (
    <nav className='fixed bottom-0 left-0 z-[5000] flex h-14 w-full items-center justify-center border-t border-solid border-neutral-200 bg-white md:h-full md:w-14 md:flex-col md:gap-10 md:border-r md:border-t-0 xl:w-48 xl:items-baseline xl:justify-start xl:px-4 xl:pt-20'>
      <h1 className='hidden text-lg font-bold text-sky-500 xl:block'>FOLIO DRIVEN</h1>
      {!isLoading && (
        <Fragment>
          {isLogin ? (
            <Fragment>
              <NavButton as={Link} href='/' label='ホーム'>
                <AiOutlineHome size={24} />
              </NavButton>
              <NavButton label='検索'>
                <AiOutlineSearch size={24} />
              </NavButton>
              <NavButton as={Link} href='/products/create' label='投稿'>
                <AiOutlineAppstoreAdd size={24} />
              </NavButton>
              <NavButton label='メッセージ'>
                <AiOutlineMail size={24} />
              </NavButton>
              <NavButton label='プロフィール'>
                <AiOutlineUser size={24} />
              </NavButton>
            </Fragment>
          ) : (
            <Button as={Link} href='/login'>
              ログイン
            </Button>
          )}
        </Fragment>
      )}
    </nav>
  );
};

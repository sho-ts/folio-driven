'use client';

import { authState } from '@/app/_shared/states/auth';
import { useRecoilValue } from 'recoil';
import { Button } from '../../../parts';
import Link from 'next/link';

export const UserInfo = () => {
  const auth = useRecoilValue(authState);

  if (!auth.isLogin) {
    return (
      <Button as={Link} href='/login'>
        ログイン
      </Button>
    );
  }

  return null;
};

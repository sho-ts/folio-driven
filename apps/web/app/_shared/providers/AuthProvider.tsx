'use client';

import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../states/auth';

type Props = {
  children?: React.ReactNode;
  isLogin: boolean;
};

export const AuthProvider = ({ children, isLogin }: Props) => {
  const [, setAuthState] = useRecoilState(authState);
  useEffect(() => {
    setAuthState({ isLogin });
  }, [isLogin, setAuthState]);

  return <Fragment>{children}</Fragment>;
};

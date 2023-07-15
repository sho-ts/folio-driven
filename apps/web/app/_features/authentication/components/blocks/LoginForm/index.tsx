'use client';

import { Schema } from './schema';
import { useCallback } from 'react';
import { useTransition } from 'react';
import { signIn } from '@/app/_shared/libs/cognito';
import { LoginFormPresenter } from './presenter';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { authState } from '@/app/_shared/states/auth';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [, setAuthState] = useRecoilState(authState);
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Schema) => {
      startTransition(async () => {
        try {
          await signIn(data.email, data.password);
          toast.success('ログインに成功しました！');
          setAuthState({ isLogin: true });
          router.replace('/');
        } catch (e) {
          toast.error('メールアドレスかパスワードが\n間違っています。');
        }
      });
    },
    [router, setAuthState],
  );

  return <LoginFormPresenter isPending={isPending} onSubmit={onSubmit} />;
};

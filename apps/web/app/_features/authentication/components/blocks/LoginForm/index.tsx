'use client';

import { Schema } from './schema';
import { useCallback } from 'react';
import { useTransition } from 'react';
import { handleLogin } from '@/app/_features/authentication/actions/login';
import { LoginFormPresenter } from './presenter';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Schema) => {
      startTransition(async () => {
        try {
          await handleLogin(data);
          toast.success('ログインに成功しました！');
          router.replace('/');
        } catch (e) {
          toast.error('メールアドレスかパスワードが\n間違っています。');
        }
      });
    },
    [router],
  );

  return <LoginFormPresenter isPending={isPending} onSubmit={onSubmit} />;
};

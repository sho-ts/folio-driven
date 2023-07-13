'use client';

import { Schema } from './schema';
import { useCallback } from 'react';
import { useTransition } from 'react';
import { signIn } from '@/app/_shared/libs/cognito';
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
          await signIn(data.email, data.password);
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

'use client';

import { Schema } from './schema';
import { useCallback } from 'react';
import { useTransition } from 'react';
import { handleLogin } from '@/app/_features/authentication/actions/login';
import { LoginFormPresenter } from './presenter';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Schema) => {
      startTransition(async () => {
        try {
          await handleLogin(data);
          router.replace('/');
        } catch (e) {
          alert('error');
        }
      });
    },
    [router],
  );

  return <LoginFormPresenter isPending={isPending} onSubmit={onSubmit} />;
};

'use client';

import { FormControl } from '@/app/_shared/components/blocks';
import { Button, TextField } from '@/app/_shared/components/parts';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const schema = z.object({
  email: z.string().nonempty('メールアドレスは必須です').email('メールアドレスの形式で入力してください'),
  password: z.string().nonempty('パスワードは必須です'),
});

type Schema = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    (data: Schema) => {

    },
    []
  );

  return (
    <>
      <FormControl errors={[errors.email?.message]} render={(props) => <TextField {...register('email')} fill placeholder="メールアドレス" {...props} />} />
      <FormControl errors={[errors.password?.message]} render={(props) => <TextField {...register('password')} fill placeholder="パスワード" {...props} />} />
      <Button fill onClick={handleSubmit(onSubmit)}>
        ログイン
      </Button>
    </>
  );
};

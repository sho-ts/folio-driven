'use client';

import { Form, FormControl } from '@/app/_shared/components/blocks';
import { Button, TextField } from '@/app/_shared/components/parts';
import { useForm } from 'react-hook-form';
import { Schema, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  isPending: boolean;
  onSubmit: (data: Schema) => void;
};

export const LoginFormPresenter = ({ isPending, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        errors={[errors?.email?.message]}
        render={(props) => (
          <TextField
            type='email'
            fill
            placeholder='メールアドレス'
            {...register('email')}
            {...props}
          />
        )}
      />
      <FormControl
        errors={[errors?.password?.message]}
        render={(props) => (
          <TextField
            type='password'
            fill
            placeholder='パスワード'
            {...register('password')}
            {...props}
          />
        )}
      />
      <Button disabled={isPending} fill type='submit'>
        ログイン
      </Button>
    </Form>
  );
};

'use client';

import { FormControl } from '@/app/_shared/components/blocks';
import { Button, TextField } from '@/app/_shared/components/parts';

export const LoginForm = () => {
  return (
    <>
      <FormControl render={(props) => <TextField fill placeholder="メールアドレス" {...props} />} />
      <FormControl render={(props) => <TextField fill placeholder="パスワード" {...props} />} />
      <Button fill>ログイン</Button>
    </>
  );
};

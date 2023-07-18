import * as z from 'zod';

export const schema = z.object({
  email: z
    .string()
    .nonempty('メールアドレスは必須です')
    .email('メールアドレスの形式で入力してください'),
  password: z.string().nonempty('パスワードは必須です'),
});

export type Schema = z.infer<typeof schema>;

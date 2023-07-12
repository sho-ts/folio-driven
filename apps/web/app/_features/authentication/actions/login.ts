'use server';

import { setTokens, signIn } from '@/app/_shared/libs/cognito';

type Input = {
  email: string;
  password: string;
};

export const handleLogin = async (input: Input) => {
  const session = await signIn(input.email, input.password);

  const idToken = session.getIdToken();
  const accessToken = session.getAccessToken();
  const refreshToken = session.getRefreshToken();

  setTokens({
    idToken,
    accessToken,
    refreshToken,
  });
};

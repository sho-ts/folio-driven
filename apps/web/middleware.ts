import { NextRequest } from 'next/server';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { getSession } from './app/_shared/libs/cognito';

export const middleware = async (request: NextRequest) => {
  if (/_next\/static\//.test(request.nextUrl.pathname)) return;

  /* Todo: 認証が必要なページが完成したらコメントアウト解除
  const _storage = {
    setItem(key: string, value: string) {
      request.cookies.set(key, value);
    },
    getItem(key: string) {
      return request.cookies.get(key)?.value ?? null;
    },
    removeItem(key: string) {
      request.cookies.delete(key);
    },
    clear() {
      request.cookies.clear();
    },
  };

  const _userPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
    ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
    Storage: _storage,
  });

  await getSession(_userPool);
  */
};

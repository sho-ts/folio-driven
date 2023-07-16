import { NextRequest } from 'next/server';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { getSession } from './app/_shared/libs/cognito';
import { MiddlewareStorage } from './app/_shared/libs/storage';

export const middleware = async (request: NextRequest) => {
  if (/_next\/static\//.test(request.nextUrl.pathname)) return;

  await getSession(
    new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
      Storage: new MiddlewareStorage(request),
    }),
  );
};

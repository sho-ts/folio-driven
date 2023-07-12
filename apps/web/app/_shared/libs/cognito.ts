import {
  CognitoUserPool,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { cookies } from 'next/headers';

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
});

export const signUp = (email: string, password: string) => {
  return new Promise<ISignUpResult>((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({
          Name: 'custom:user_type',
          Value: '1', // Todo: userTypeを引数で渡す
        }),
      ],
      [],
      (error, result) => {
        if (error) reject(error);
        if (!result) reject(new Error('result was not returned'));

        return resolve(result!);
      },
    );
  });
};

export const signIn = (email: string, password: string) => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise<CognitoUserSession>((resolve, reject) => {
    user.authenticateUser(
      new AuthenticationDetails({
        Username: email,
        Password: password,
      }),
      {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (error) => {
          reject(error);
        },
      },
    );
  });
};

export const setTokens = ({
  idToken,
  accessToken,
  refreshToken,
}: {
  idToken: CognitoIdToken;
  accessToken: CognitoAccessToken;
  refreshToken: CognitoRefreshToken;
}) => {
  cookies().set('idToken', idToken.getJwtToken(), {
    httpOnly: true,
    secure: true,
    expires: new Date((idToken.getExpiration() - 10 * 60) * 1000).getTime(),
  });
  cookies().set('accessToken', accessToken.getJwtToken(), {
    httpOnly: true,
    secure: true,
    expires: new Date((accessToken.getExpiration() - 10 * 60) * 1000).getTime(),
  });
  cookies().set('refreshToken', refreshToken.getToken(), {
    httpOnly: true,
    secure: true,
  });
};

export const getTokens = async () => {
  const idToken = cookies().get('idToken')?.value;
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  if (!refreshToken) throw new Error('ログインしていません');

  if (!idToken || !accessToken) {
    return await refreshSession(refreshToken);
  }

  return { idToken, accessToken, refreshToken };
};

export const refreshSession = (refreshToken: string) => {
  return new Promise<{
    idToken: string;
    accessToken: string;
    refreshToken: string;
  }>((resolve, reject) => {
    const user = userPool.getCurrentUser();

    if (!user) return reject(new Error('不正なユーザー'));

    user.refreshSession(
      new CognitoRefreshToken({ RefreshToken: refreshToken }),
      (result: CognitoUserSession, err: Error) => {
        if (err) return reject(err.message);

        const idToken = result.getIdToken();
        const accessToken = result.getAccessToken();
        const refreshToken = result.getRefreshToken();

        setTokens({ idToken, accessToken, refreshToken });
        resolve({
          idToken: idToken.getJwtToken(),
          accessToken: accessToken.getJwtToken(),
          refreshToken: refreshToken.getToken(),
        });
      },
    );
  });
};

/** サインアップ時にCognitoから送信されたコードを認証する */
export const confirmRegistration = (email: string, code: string) => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise<boolean>((resolve, reject) => {
    user.confirmRegistration(code, true, (error: Error) => {
      if (error) reject(error);
      resolve(true);
    });
  });
};

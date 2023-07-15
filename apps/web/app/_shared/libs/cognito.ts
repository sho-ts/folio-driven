'use server';

import {
  CognitoUserPool,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { Storage } from './storage';

class DefaultStorage extends Storage {
  /**
   * getSession時にCognitoがsetItemでデータを更新しようとするが、
   * Next13のcookies().set()は、server actionsかAPI Routesでしか使用できないため、
   * デフォルトではsetItemをオーバーライドして無効化する
   **/
  setItem(key: string, value: string) {}
}

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
  Storage: new DefaultStorage(),
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

export const signIn = async (email: string, password: string) => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
    Storage: new Storage(),
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(
      new AuthenticationDetails({
        Username: email,
        Password: password,
      }),
      {
        onSuccess: () => {
          resolve({ message: 'success' });
        },
        onFailure: (error) => {
          reject(error);
        },
      },
    );
  });
};

export const getSession = (_userPool = userPool) => {
  const user = _userPool.getCurrentUser();

  return new Promise<CognitoUserSession | null>((resolve, reject) => {
    if (!user) return resolve(null);

    user.getSession((error: Error | null, session: CognitoUserSession | null) => {
      if (error) return reject(error);
      resolve(session);
    });
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

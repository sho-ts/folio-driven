'use server';

import {
  CognitoUserPool,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
  ICognitoStorage,
} from 'amazon-cognito-identity-js';
import { cookies } from 'next/headers';

/**
 * バックエンドでcognito-identity-jsを使用する場合、
 * デフォルトでユーザーの認証情報をインメモリーのストレージに保存してしまうため、
 * ブラウザのCookieに保存できるようにストレージを自前で実装する
 * - <https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/StorageHelper.js>
 * - <https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/CognitoUser.js>
 */
const userStorage: ICognitoStorage = {
  setItem(key: string, value: string) {
    cookies().set(key, value, {
      httpOnly: true,
      secure: true,
    });
  },
  getItem(key: string) {
    const data = cookies().get(key);

    if (!data) return null;
    return data.value;
  },
  removeItem(key: string) {
    cookies().delete(key);
  },
  clear() {},
};

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
  Storage: userStorage,
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
    Storage: userStorage,
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

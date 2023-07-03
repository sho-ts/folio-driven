import { CognitoUserPool, CognitoUser, ISignUpResult, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute } from 'amazon-cognito-identity-js';

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
      }
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
      }
    );
  });
};

/** サインアップ時にCongitoから送信されたコードを認証する */
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

import { ICognitoStorage } from 'amazon-cognito-identity-js';
import { cookies } from 'next/headers';

/**
 * バックエンドでcognito-identity-jsを使用する場合、
 * デフォルトでユーザーの認証情報をインメモリーのストレージに保存してしまうため、
 * ブラウザのCookieに保存できるようにストレージを自前で実装する
 * - <https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/StorageHelper.js>
 * - <https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/CognitoUser.js>
 */
export class Storage implements ICognitoStorage {
  setItem(key: string, value: string) {
    cookies().set(key, value, {
      httpOnly: true,
      secure: true,
    });
  }
  getItem(key: string) {
    const data = cookies().get(key);

    if (!data) return null;
    return data.value;
  }
  removeItem(key: string) {
    cookies().delete(key);
  }
  clear() {}
}

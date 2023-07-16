import { ICognitoStorage } from 'amazon-cognito-identity-js';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export class ServerActionStorage implements ICognitoStorage {
  setItem(key: string, value: string) {
    cookies().set(key, value, {
      httpOnly: true,
      // ローカル開発の時はhttpでも使用できるようにする
      secure: process.env.NODE_ENV !== 'development',
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
  clear() {
    cookies()
      .getAll()
      .forEach((cookie) => {
        this.removeItem(cookie.name);
      });
  }
}

/** 読み取り専用 */
export class ReadonlyStorage extends ServerActionStorage implements ICognitoStorage {
  setItem(_key: string, _value: string) {}
  removeItem(_key: string) {}
  clear() {}
}

export class MiddlewareStorage implements ICognitoStorage {
  constructor(private readonly request: NextRequest) {}

  setItem(key: string, value: string) {
    this.request.cookies.set(key, value);
  }
  getItem(key: string) {
    return this.request.cookies.get(key)?.value ?? null;
  }
  removeItem(key: string) {
    this.request.cookies.delete(key);
  }
  clear() {
    this.request.cookies.clear();
  }
}

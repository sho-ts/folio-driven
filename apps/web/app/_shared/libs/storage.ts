import { ICognitoStorage } from 'amazon-cognito-identity-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export class ServerActionStorage implements ICognitoStorage {
  setItem(key: string, value: string) {
    cookies().set(key, value, {
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
  constructor(private readonly request: NextRequest, private readonly response: NextResponse) {}

  setItem(key: string, value: string) {
    this.response.cookies.set(key, value, {
      secure: process.env.NODE_ENV !== 'development',
    });
  }
  getItem(key: string) {
    return this.request.cookies.get(key)?.value ?? null;
  }
  removeItem(key: string) {
    this.response.cookies.set(key, '', {
      expires: new Date(Date.now()),
    });
  }
  clear() {
    this.response.cookies.getAll().forEach((cookie) => {
      this.removeItem(cookie.name);
    });
  }
}

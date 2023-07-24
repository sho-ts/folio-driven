'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setVerbosity } from 'ts-invariant';
import { getSession } from '../libs/cognito';
import { CognitoUserPool, ICognitoStorage } from 'amazon-cognito-identity-js';

class ClientSideStorage implements ICognitoStorage {
  getItem(key: string) {
    if (typeof document === 'undefined') return null;

    const cookies: { [k: string]: string | undefined } = Object.fromEntries(
      document.cookie.split('; ').map((v) => v.split('=')),
    );
    return cookies[key] ?? null;
  }
  setItem(_key: string, _value: string) {}
  removeItem(_key: string) {}
  clear() {}
}

if (process.env.NODE_ENV === 'development') {
  setVerbosity('debug');
  loadDevMessages();
  loadErrorMessages();
}

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession(
    new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
      Storage: new ClientSideStorage(),
    }),
  );

  const accessToken = session?.getAccessToken().getJwtToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const makeClient = () => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    ),
  });
};

export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};

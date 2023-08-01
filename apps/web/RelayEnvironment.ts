import { Environment, FetchFunction, Network, RecordSource, Store } from 'relay-runtime';
import { CognitoUserPool, CognitoUserSession, ICognitoStorage } from 'amazon-cognito-identity-js';

const fetchGraphQL = async (text: string | null, variables: { [k: string]: unknown }) => {
  const session = await getSession(
    new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID as string,
      Storage: new ClientSideStorage(),
    }),
  );

  const accessToken = session?.getAccessToken().getJwtToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
    method: 'POST',
    headers: {
      Authorization: accessToken ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
};

const getSession = (userPool: CognitoUserPool) => {
  const user = userPool.getCurrentUser();

  return new Promise<CognitoUserSession | null>((resolve, reject) => {
    if (!user) return resolve(null);

    user.getSession((error: Error | null, session: CognitoUserSession | null) => {
      if (error) return reject(error);
      resolve(session);
    });
  });
};

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

const fetchRelay: FetchFunction = async (params, variables) => {
  return fetchGraphQL(params.text, variables);
};

export const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

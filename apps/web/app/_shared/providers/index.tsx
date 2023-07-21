import { getSession } from '../libs/cognito';
import { AuthProvider } from './AuthProvider';
import { RecoilProvider } from './RecoilProvider';
import { ApolloProvider } from './ApolloProvider';

type Props = {
  children?: React.ReactNode;
};

export const Provider = async ({ children }: Props) => {
  const session = await getSession();
  return (
    <ApolloProvider>
      <RecoilProvider>
        <AuthProvider isLogin={!!session}>{children}</AuthProvider>
      </RecoilProvider>
    </ApolloProvider>
  );
};

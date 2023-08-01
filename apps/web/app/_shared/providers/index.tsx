import { getSession } from '../libs/cognito';
import { AuthProvider } from './AuthProvider';
import { RecoilProvider } from './RecoilProvider';
import { RelayProvider } from './RelayProvider';

type Props = {
  children?: React.ReactNode;
};

export const Provider = async ({ children }: Props) => {
  const session = await getSession();
  return (
    <RelayProvider>
      <RecoilProvider>
        <AuthProvider isLogin={!!session}>{children}</AuthProvider>
      </RecoilProvider>
    </RelayProvider>
  );
};

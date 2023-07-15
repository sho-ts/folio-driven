import { getSession } from '../libs/cognito';
import { AuthProvider } from './AuthProvider';
import { RecoilProvider } from './RecoilProvider';

type Props = {
  children?: React.ReactNode;
};

export const Provider = async ({ children }: Props) => {
  const session = await getSession();
  return (
    <RecoilProvider>
      <AuthProvider isLogin={!!session}>{children}</AuthProvider>
    </RecoilProvider>
  );
};

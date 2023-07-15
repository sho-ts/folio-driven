import { Header, Layout, Main } from '@/app/_shared/components/layouts';
import { Toaster } from 'react-hot-toast';
import { Provider } from '../_shared/providers';
import { BottomNavigation } from '../_shared/components/layouts/BottomNavigation';

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Provider>
      <Toaster position='top-right' />
      <Layout>
        <Header />
        <Main>{children}</Main>
        <BottomNavigation />
      </Layout>
    </Provider>
  );
};

export default PageLayout;

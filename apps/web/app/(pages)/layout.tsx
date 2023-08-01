import { Header, Layout, Main, Navigation } from '@/app/_shared/components/layouts';
import { Toaster } from 'react-hot-toast';
import { Provider } from '../_shared/providers';

// type Props = {
//   children?: React.ReactNode;
// };

const PageLayout = ({ children }: any) => {
  return (
    <Provider>
      <Toaster position='top-right' />
      <Layout>
        {children}
        <Navigation />
      </Layout>
    </Provider>
  );
};

export default PageLayout;

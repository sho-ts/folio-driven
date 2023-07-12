import { Header, Layout, Main } from '@/app/_shared/components/layouts';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <Toaster position='top-right' />
      <Layout>
        <Header />
        <Main>{children}</Main>
      </Layout>
    </Fragment>
  );
};

export default PageLayout;

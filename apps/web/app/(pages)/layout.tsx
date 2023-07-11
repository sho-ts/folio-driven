import { Header, Layout, Main } from '@/app/_shared/components/layouts';

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Header />
      <Main>{children}</Main>
    </Layout>
  );
};

export default PageLayout;

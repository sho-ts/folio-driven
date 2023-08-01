'use client';

import { Header, Main } from '@/app/_shared/components/layouts';
import { Fragment, Suspense } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { usePreloadedQuery, loadQuery } from 'react-relay';
import { environment } from '@/RelayEnvironment';

// page.tsxに書いてしまうとrelayの規約でpageQueryという名前になってしまうので別コンポーネントに移動すること
const HOME_QUERY = graphql`
  query pageQuery {
    products {
      ...ProductCards_products
    }
  }
`;

const preloadedQuery = loadQuery(environment, HOME_QUERY, {
  /* query variables */
});

const Wrap = () => {
  const data = usePreloadedQuery(HOME_QUERY, preloadedQuery) as any;
  console.log(data);
  return <div>hogehoge</div>;
};

const Home = () => {
  const data = usePreloadedQuery(HOME_QUERY, preloadedQuery) as any;

  console.log(data);

  return (
    <Fragment>
      <Header title='ホーム' />
      <Main>
        <Suspense fallback={<p>test</p>}>
          <Wrap />
        </Suspense>
      </Main>
    </Fragment>
  );
};

export default Home;

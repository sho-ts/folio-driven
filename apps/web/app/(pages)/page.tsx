import {
  ProductCards,
  ProductCardsFragment,
} from '../_features/product/components/blocks/ProductCards';
import { gql } from '@apollo/client';
import { getClient } from '../_shared/libs/apollo';
import { Fragment } from 'react';
import { Header, Main } from '../_shared/components/layouts';

const query = gql`
  query Home {
    products {
      ...ProductCardsFragment
    }
  }
  ${ProductCardsFragment}
`;

const Home = async () => {
  const { data } = await getClient().query({
    query,
  });

  return (
    <Fragment>
      <Header title='ホーム' />
      <Main>
        <ProductCards products={data.products} />
      </Main>
    </Fragment>
  );
};

export default Home;

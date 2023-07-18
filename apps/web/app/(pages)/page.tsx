import {
  ProductCards,
  ProductCardsFragment,
} from '@/app/_features/product/core/components/blocks/ProductCards';
import { gql } from '@apollo/client';
import { getClient } from '@/app/_shared/libs/apollo';
import { Header, Main } from '@/app/_shared/components/layouts';
import { Fragment } from 'react';

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

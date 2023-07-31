'use client';

import {
  ProductCards,
  ProductCardsFragment,
} from '@/app/_features/product/core/components/blocks/ProductCards';
import { gql, useQuery } from '@apollo/client';
import { Header, Main } from '@/app/_shared/components/layouts';
import { Fragment } from 'react';

const HOME = gql`
  query Home {
    products {
      ...ProductCardsFragment
    }
  }
  ${ProductCardsFragment}
`;

const Home = () => {
  const { data } = useQuery(HOME);

  return (
    <Fragment>
      <Header title='ホーム' />
      <Main>
        <ProductCards products={data?.products} />
      </Main>
    </Fragment>
  );
};

export default Home;

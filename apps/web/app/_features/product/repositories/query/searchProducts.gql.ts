import { getClient } from '@/app/_shared/libs/apollo';
import { SearchProductsQuery } from '@/schema/graphql';
import { gql } from '@apollo/client';

export const query = gql`
  query SearchProducts {
    products {
      items {
        title
        description
        productId
        createdAt
        updatedAt
      }
    }
  }
`;

export const searchProducts = () => {
  return getClient().query<SearchProductsQuery>({ query });
};

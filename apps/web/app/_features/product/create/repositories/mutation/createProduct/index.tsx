'use server';

import { getClient } from '@/app/_shared/libs/apollo';
import { gql } from '@apollo/client';

type CreateProductInput = {
  title: string;
  overview?: string;
  description?: string;
};

export const createProduct = (input: CreateProductInput) => {
  return getClient().mutate({
    mutation: gql`
      mutation CreateProduct {
        createProduct(input: $input) {
          productId
        }
      }
    `,
    variables: {
      input,
    },
  });
};

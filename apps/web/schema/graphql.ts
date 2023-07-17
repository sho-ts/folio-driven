/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date };
};

export type CognitoUser = {
  __typename?: 'CognitoUser';
  cognitoId: Scalars['String']['output'];
  email: Scalars['String']['output'];
};

export type CreateMediaInput = {
  object: Scalars['String']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hashtags?: InputMaybe<Array<CreateProductInputHashtag>>;
  images?: InputMaybe<Array<CreateProductInputImage>>;
  overview?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  websites?: InputMaybe<Array<CreateProductInputWebsite>>;
};

export type CreateProductInputHashtag = {
  hashtagName: Scalars['String']['input'];
};

export type CreateProductInputImage = {
  order: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreateProductInputWebsite = {
  url: Scalars['String']['input'];
  websiteType: Scalars['Int']['input'];
};

export type Creator = {
  __typename?: 'Creator';
  cognitoId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  nickName?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Products>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Media = {
  __typename?: 'Media';
  mediaId: Scalars['String']['output'];
  mediaType: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMedia: Media;
  createProduct: Product;
};

export type MutationCreateMediaArgs = {
  input: CreateMediaInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  creator: Creator;
  creatorId: Scalars['String']['output'];
  deletedAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  productImages?: Maybe<ProductImages>;
  productStatus: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  order: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type ProductImages = {
  __typename?: 'ProductImages';
  items?: Maybe<Array<ProductImage>>;
  total: Scalars['Int']['output'];
};

export type Products = {
  __typename?: 'Products';
  items?: Maybe<Array<Product>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  creator: Creator;
  product: Product;
  products: Products;
  self?: Maybe<CognitoUser>;
};

export type QueryCreatorArgs = {
  displayName: Scalars['String']['input'];
};

export type QueryProductArgs = {
  productId: Scalars['String']['input'];
};

export type QueryProductsArgs = {
  input?: InputMaybe<SearchProductsInput>;
};

export type SearchProductsInput = {
  creatorDisplayName?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type HomeQueryVariables = Exact<{ [key: string]: never }>;

export type HomeQuery = {
  __typename?: 'Query';
  products: { __typename?: 'Products' } & {
    ' $fragmentRefs'?: { ProductCardsFragmentFragment: ProductCardsFragmentFragment };
  };
};

export type ProductCardsFragmentFragment = {
  __typename?: 'Products';
  total: number;
  items?: Array<{
    __typename?: 'Product';
    productId: string;
    title: string;
    productImages?: {
      __typename?: 'ProductImages';
      items?: Array<{ __typename?: 'ProductImage'; url: string }> | null;
    } | null;
  }> | null;
} & { ' $fragmentName'?: 'ProductCardsFragmentFragment' };

export const ProductCardsFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCardsFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Products' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'productId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productImages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductCardsFragmentFragment, unknown>;
export const HomeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Home' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ProductCardsFragment' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCardsFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Products' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'productId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'productImages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;

/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
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

export type Creator = {
  __typename?: "Creator";
  createdAt: Scalars["DateTime"]["output"];
  deletedAt: Scalars["DateTime"]["output"];
  displayName: Scalars["String"]["output"];
  nickName: Scalars["String"]["output"];
  products: Products;
  updatedAt: Scalars["DateTime"]["output"];
};

export type Product = {
  __typename?: "Product";
  createdAt: Scalars["DateTime"]["output"];
  creator: Creator;
  creatorId: Scalars["String"]["output"];
  deletedAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  overview: Scalars["String"]["output"];
  productId: Scalars["String"]["output"];
  productStatus: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Products = {
  __typename?: "Products";
  items?: Maybe<Array<Product>>;
  total: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  creator: Creator;
  product: Product;
  products: Products;
};

export type QueryCreatorArgs = {
  displayName: Scalars["String"]["input"];
};

export type QueryProductArgs = {
  productId: Scalars["String"]["input"];
};

export type QueryProductsArgs = {
  input?: InputMaybe<SearchProductsInput>;
};

export type SearchProductsInput = {
  creatorDisplayName?: InputMaybe<Scalars["String"]["input"]>;
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<Scalars["Int"]["input"]>;
  productIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type SearchProductsQueryVariables = Exact<{ [key: string]: never }>;

export type SearchProductsQuery = {
  __typename?: "Query";
  products: {
    __typename?: "Products";
    items?: Array<{
      __typename?: "Product";
      title: string;
      description: string;
      productId: string;
      createdAt: Date;
      updatedAt: Date;
    }> | null;
  };
};

export const SearchProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchProducts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "productId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
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
} as unknown as DocumentNode<SearchProductsQuery, SearchProductsQueryVariables>;

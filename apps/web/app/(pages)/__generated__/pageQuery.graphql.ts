/**
 * @generated SignedSource<<aa06c3a71331b323a5fd3416d7c2e5ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery$variables = {};
export type pageQuery$data = {
  readonly products: {
    readonly " $fragmentSpreads": FragmentRefs<"ProductCards_products">;
  };
};
export type pageQuery = {
  response: pageQuery$data;
  variables: pageQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Products",
        "kind": "LinkedField",
        "name": "products",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProductCards_products"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Products",
        "kind": "LinkedField",
        "name": "products",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "total",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Product",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "productId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductImages",
                "kind": "LinkedField",
                "name": "productImages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProductImage",
                    "kind": "LinkedField",
                    "name": "items",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e178dc396de624954923e78cf5f1ac19",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery {\n  products {\n    ...ProductCards_products\n  }\n}\n\nfragment ProductCards_products on Products {\n  total\n  items {\n    productId\n    title\n    productImages {\n      items {\n        url\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "6d588b922b7a08bcf692a24f18ab04f4";

export default node;

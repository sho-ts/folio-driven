/**
 * @generated SignedSource<<9993fd4c3f878388f1acbc9c2e5009ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductCards_products$data = {
  readonly items: ReadonlyArray<{
    readonly productId: string;
    readonly productImages: {
      readonly items: ReadonlyArray<{
        readonly url: string;
      }> | null;
    } | null;
    readonly title: string;
  }> | null;
  readonly total: number;
  readonly " $fragmentType": "ProductCards_products";
};
export type ProductCards_products$key = {
  readonly " $data"?: ProductCards_products$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductCards_products">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductCards_products",
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
  "type": "Products",
  "abstractKey": null
};

(node as any).hash = "cb2aaa4b077d96a172d58b8441d3bb21";

export default node;

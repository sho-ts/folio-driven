/**
 * @generated SignedSource<<6a4e069f97cc86b2890d8abbb43be256>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateProductInput = {
  description?: string | null;
  hashtags?: ReadonlyArray<CreateProductInputHashtag> | null;
  images?: ReadonlyArray<CreateProductInputImage> | null;
  overview?: string | null;
  title: string;
  websites?: ReadonlyArray<CreateProductInputWebsite> | null;
};
export type CreateProductInputHashtag = {
  hashtagName: string;
};
export type CreateProductInputImage = {
  order: number;
  url: string;
};
export type CreateProductInputWebsite = {
  url: string;
  websiteType: number;
};
export type CreateProductFormMutation$variables = {
  input: CreateProductInput;
};
export type CreateProductFormMutation$data = {
  readonly createProduct: {
    readonly productId: string;
  };
};
export type CreateProductFormMutation = {
  response: CreateProductFormMutation$data;
  variables: CreateProductFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "createProduct",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "productId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateProductFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateProductFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b51940f5c35569c250b3e3a6a725550c",
    "id": null,
    "metadata": {},
    "name": "CreateProductFormMutation",
    "operationKind": "mutation",
    "text": "mutation CreateProductFormMutation(\n  $input: CreateProductInput!\n) {\n  createProduct(input: $input) {\n    productId\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc7ebd72281f1b2c6de53ef8e399dc81";

export default node;

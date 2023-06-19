import { ProductId } from '@/domain/object/product/product-id.object';

export class FindProductInput {
  readonly productId: ProductId;

  constructor(input: { productId: ProductId }) {
    this.productId = input.productId;
  }
}

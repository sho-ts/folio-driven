import { ProductId } from '@/domain/object/product/product-id.object';

export class SearchProductImagesInput {
  readonly productId: ProductId;

  constructor(input: { productId: ProductId }) {
    this.productId = input.productId;
  }
}

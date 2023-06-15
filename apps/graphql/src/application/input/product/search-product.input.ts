import { DisplayName } from '@/domain/object/creator/display-name.object';
import { ProductId } from '@/domain/object/product/product-id.object';

export class SearchProductInput {
  keyword?: string;
  creatorDisplayName?: DisplayName;
  productIds?: ProductId[];

  constructor(input?: { keyword?: string; creatorDisplayName?: DisplayName; productIds?: ProductId[] }) {
    this.keyword = input?.keyword;
    this.creatorDisplayName = input?.creatorDisplayName;
    this.productIds = input?.productIds;
  }
}

import { ProductImages } from '@/domain/entity/aggregation/product-images.entity';

export class SearchProductImagesOutput {
  constructor(readonly productImages: ProductImages) {}
}

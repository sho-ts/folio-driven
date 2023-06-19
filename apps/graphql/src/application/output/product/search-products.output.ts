import { Products } from '@/domain/entity/aggregation/products.entity';

export class SearchProductsOutput {
  constructor(readonly products: Products) {}
}

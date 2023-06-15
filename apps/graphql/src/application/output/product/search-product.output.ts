import { Products } from '@/domain/entity/aggregation/products.entity';

export class SearchProductOutput {
  constructor(readonly products: Products) {}
}

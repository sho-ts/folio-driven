import { Product } from '@/domain/entity/product/product.entity';

export class FindProductOutput {
  constructor(readonly product: Product) {}
}

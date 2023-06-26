import { Product } from '@/domain/entity/product/product.entity';

export class CreateProductOutput {
  constructor(readonly product: Product) {}
}

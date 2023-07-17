import { ProductImage } from '@/domain/entity/product/product-image.entity';

export class CreateProductImageOutput {
  constructor(readonly productImage: ProductImage) {}
}

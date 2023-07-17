import { ProductImages } from '@/domain/entity/aggregation/product-images.entity';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductImageRepository {
  constructor(
    @InjectRepository(ProductImage)
    private readonly repository: Repository<ProductImage>,
  ) {}

  async search(productImages: ProductImages) {
    const query = this.repository.createQueryBuilder('productImage').select('productImage');

    if (productImages.productId) {
      query.where('productImage.productId = :productId', {
        productId: productImages.productId,
      });
    }

    const [total, items] = await Promise.all([query.getCount(), query.getMany()]);

    const result = new ProductImages();
    result.total = total;
    result.items = items;

    return result;
  }

  async save(productImage: ProductImage, manager?: EntityManager) {
    return manager?.getRepository(ProductImage)?.save(productImage) ?? this.repository.save(productImage);
  }
}

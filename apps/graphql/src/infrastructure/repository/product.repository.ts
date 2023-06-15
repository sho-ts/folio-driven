import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/domain/entity/product/product.entity';
import { Products } from '@/domain/entity/aggregation/products.entity';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { safeWhere } from '@/utility/typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  find(product: Product) {
    return this.repository.findOneBy({ productId: product.productId });
  }

  async search(products: Products) {
    const query = this.repository.createQueryBuilder('product').select('product');

    products.creatorDisplayName && query.innerJoin(Creator, 'creator', 'creator.creatorId = product.creatorId');

    query
      .where(
        ...safeWhere('creator.displayName = :displayName', {
          displayName: products.creatorDisplayName,
        }),
      )
      .andWhere(
        ...safeWhere('product.description like :keyword', {
          keyword: products.keyword ? `%${products.keyword}%` : null,
        }),
      );

    const [total, items] = await Promise.all([query.getCount(), query.getMany()]);

    const result = new Products();
    result.total = total;
    result.items = items;

    return result;
  }
}

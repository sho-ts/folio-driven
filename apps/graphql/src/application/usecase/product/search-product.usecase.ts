import { SearchProductInput } from '@/application/input/product/search-product.input';
import { SearchProductOutput } from '@/application/output/product/search-product.output';
import { Products } from '@/domain/entity/aggregation/products.entity';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handle(input: SearchProductInput) {
    const products = new Products();
    products.keyword = input.keyword;
    products.creatorDisplayName = input.creatorDisplayName;

    const result = await this.productRepository.search(products);

    return new SearchProductOutput(result);
  }
}

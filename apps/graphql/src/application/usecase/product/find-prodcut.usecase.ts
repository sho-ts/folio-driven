import { FindProductInput } from '@/application/input/product/find-product.input';
import { FindProductOutput } from '@/application/output/product/find-product.output';
import { Product } from '@/domain/entity/product/product.entity';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handle(input: FindProductInput) {
    const product = new Product();
    product.productId = input.productId;

    const result = await this.productRepository.find(product);

    return new FindProductOutput(result);
  }
}

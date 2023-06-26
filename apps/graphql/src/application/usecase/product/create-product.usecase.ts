import { CreateProductInput } from '@/application/input/product/create-product.input';
import { CreateProductOutput } from '@/application/output/product/create-product.output';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { ProductId } from '@/domain/object/product/product-id.object';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handle(input: CreateProductInput) {
    const creator = new Creator();
    creator.cognitoId = input.cognitoId;

    const product = new Product();
    product.title = input.title;
    product.overview = input.overview;
    product.description = input.description;
    product.hashtags = input.hashtags;
    product.websites = input.websites;

    // const result = await this.productRepository.find(product);
    const result = product;
    result.productId = 'dummy' as ProductId;
    result.creatorId = 'dummy' as CreatorId;

    return new CreateProductOutput(result);
  }
}

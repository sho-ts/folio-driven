import { CreateProductImageInput } from '@/application/input/product/product-image/create-product-image.input';
import { CreateProductImageOutput } from '@/application/output/product/product-image/create-product-image.output';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { ProductImageRepository } from '@/infrastructure/repository/product-image.repository';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductImageUseCase {
  constructor(private readonly productImageRepository: ProductImageRepository, private readonly productRepository: ProductRepository, private readonly creatorRepository: CreatorRepository) {}

  async handle(input: CreateProductImageInput) {
    try {
      const _product = new Product();
      _product.productId = input.productId;
      const product = await this.productRepository.find(_product);

      if (!product) {
        throw new Error(
          JSON.stringify({
            message: 'Productが存在しません',
            productId: input.productId,
          }),
        );
      }

      const _creator = new Creator();
      _creator.cognitoId = input.cognitoId;
      const creator = await this.creatorRepository.find(_creator);

      if (!creator) {
        throw new Error(
          JSON.stringify({
            message: '対象のCognitoIdを持つCreatorが存在しません',
            cognitoId: input.cognitoId,
          }),
        );
      }

      if (product.creatorId !== creator.creatorId) {
        throw new Error(
          JSON.stringify({
            message: 'creatorのcreatorIdとproductのcreatorIdが一致しません',
            productId: product.productId,
            creatorId: creator.creatorId,
            cognitoId: creator.cognitoId,
          }),
        );
      }

      const productImage = new ProductImage();
      productImage.productId = product.productId;
      productImage.creatorId = creator.creatorId;
      // productImage.url = input.url;
      const result = await this.productImageRepository.save(productImage);

      return new CreateProductImageOutput(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

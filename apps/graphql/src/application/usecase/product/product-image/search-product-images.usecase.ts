import { SearchProductImagesInput } from '@/application/input/product/product-image/search-product-images.input';
import { SearchProductImagesOutput } from '@/application/output/product/product-image/search-product-images.output';
import { ProductImages } from '@/domain/entity/aggregation/product-images.entity';
import { ProductImageRepository } from '@/infrastructure/repository/product-image.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchProductImagesUseCase {
  constructor(private readonly productImageRepository: ProductImageRepository) {}

  async handle(input: SearchProductImagesInput) {
    const productImages = new ProductImages();
    productImages.productId = input.productId;
    const result = await this.productImageRepository.search(productImages);

    return new SearchProductImagesOutput(result);
  }
}

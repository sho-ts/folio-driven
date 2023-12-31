import { Module } from '@nestjs/common';
import { CreatorResolver } from './creator/creator.resolver';
import { UseCaseModule } from '@/application/usecase/usecase.module';
import { FindCreatorUseCase } from '@/application/usecase/creator/find-creator.usecase';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { ProductResolver } from './product/product.resolver';
import { BatchFindCreatorUseCase } from '@/application/usecase/creator/batch-find-creator.usecase';
import { FindProductUseCase } from '@/application/usecase/product/find-prodcut.usecase';
import { SelfResolver } from './self/self.resolver';
import { CreateProductUseCase } from '@/application/usecase/product/create-product.usecase';
import { SearchProductImagesUseCase } from '@/application/usecase/product/product-image/search-product-images.usecase';
import { CreateMediaUseCase } from '@/application/usecase/media/create-media.usecase';
import { MediaResolver } from '@/adapter/resolver/media/media.resolver';

@Module({
  providers: [
    SelfResolver,
    CreatorResolver,
    MediaResolver,
    ProductResolver,
    FindCreatorUseCase,
    BatchFindCreatorUseCase,
    FindProductUseCase,
    SearchProductsUseCase,
    CreateProductUseCase,
    SearchProductImagesUseCase,
    CreateMediaUseCase,
  ],
  imports: [UseCaseModule],
})
export class ResolverModule {}

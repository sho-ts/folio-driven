import { Module } from '@nestjs/common';
import { CreatorResolver } from './creator/creator.resolver';
import { UseCaseModule } from '@/application/usecase/usecase.module';
import { FindCreatorUseCase } from '@/application/usecase/creator/find-creator.usecase';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { ProductResolver } from './product/product.resolver';
import { BatchFindCreatorUseCase } from '@/application/usecase/creator/batch-find-creator.usecase';

@Module({
  providers: [CreatorResolver, ProductResolver, FindCreatorUseCase, BatchFindCreatorUseCase, SearchProductsUseCase],
  imports: [UseCaseModule],
})
export class ResolverModule {}

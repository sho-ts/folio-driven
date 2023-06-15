import { Module } from '@nestjs/common';
import { CreatorResolver } from './creator/creator.resolver';
import { UseCaseModule } from '@/application/usecase/usecase.module';
import { FindCreatorUseCase } from '@/application/usecase/creator/find-creator.usecase';
import { SearchProductsUseCase } from '@/application/usecase/product/search-product.usecase';

@Module({
  providers: [CreatorResolver, FindCreatorUseCase, SearchProductsUseCase],
  imports: [UseCaseModule],
})
export class ResolverModule {}

import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from '@/domain/entity/product/product.entity';
import { SearchProductsInput } from '@/application/input/product/search-products.input';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { Products } from '@/domain/entity/aggregation/products.entity';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { BatchFindCreatorInput } from '@/application/input/creator/batch-find-creator.input';
import { BatchFindCreatorUseCase } from '@/application/usecase/creator/batch-find-creator.usecase';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private searchProductsUseCase: SearchProductsUseCase, private batchFindCreatorUseCase: BatchFindCreatorUseCase) {}

  @Query(() => Products)
  async products(@Args('input', { nullable: true }) input: SearchProductsInput = new SearchProductsInput()) {
    const output = await this.searchProductsUseCase.handle(input);

    return output.products;
  }

  @ResolveField(() => Creator)
  async creator(@Parent() product: Product) {
    const input = new BatchFindCreatorInput({ creatorId: product.creatorId });
    const output = await this.batchFindCreatorUseCase.handle(input);

    return output.creator;
  }
}

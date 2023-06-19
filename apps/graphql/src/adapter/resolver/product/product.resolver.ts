import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from '@/domain/entity/product/product.entity';
import { SearchProductsInput } from '@/application/input/product/search-products.input';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { Products } from '@/domain/entity/aggregation/products.entity';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { FindCreatorUseCase } from '@/application/usecase/creator/find-creator.usecase';
import { FindCreatorInput } from '@/application/input/creator/find-creator.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private searchProductsUseCase: SearchProductsUseCase, private findCreatorUseCase: FindCreatorUseCase) {}

  @Query(() => Products)
  async products(@Args('input', { nullable: true }) input: SearchProductsInput = new SearchProductsInput()) {
    const output = await this.searchProductsUseCase.handle(input);

    return output.products;
  }

  @ResolveField(() => Creator)
  async creator(@Parent() product: Product) {
    const input = new FindCreatorInput({ creatorId: product.creatorId });
    const output = await this.findCreatorUseCase.handle(input);

    return output.creator;
  }
}

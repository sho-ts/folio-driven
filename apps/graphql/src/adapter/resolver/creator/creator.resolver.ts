import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { DisplayName } from '@/domain/object/creator/display-name.object';
import { FindCreatorInput } from '@/application/input/creator/find-creator.input';
import { FindCreatorUseCase } from '@/application/usecase/creator/find-creator.usecase';
import { Products } from '@/domain/entity/aggregation/products.entity';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { SearchProductsInput } from '@/application/input/product/search-products.input';

@Resolver(() => Creator)
export class CreatorResolver {
  constructor(private findCreatorUseCase: FindCreatorUseCase, private searchProductUseCase: SearchProductsUseCase) {}

  @Query(() => Creator)
  async creator(@Args('displayName', { type: () => String }) displayName: DisplayName) {
    const input = new FindCreatorInput(displayName);
    const output = await this.findCreatorUseCase.handle(input);

    return output.creator;
  }

  @ResolveField(() => Products)
  async products(@Parent() creator: Creator) {
    const input = new SearchProductsInput({ creatorDisplayName: creator.displayName });
    const output = await this.searchProductUseCase.handle(input);

    return output.products;
  }
}

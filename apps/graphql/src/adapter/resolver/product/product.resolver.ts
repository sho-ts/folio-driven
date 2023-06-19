import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from '@/domain/entity/product/product.entity';
import { SearchProductsInput } from '@/application/input/product/search-products.input';
import { SearchProductsUseCase } from '@/application/usecase/product/search-products.usecase';
import { Products } from '@/domain/entity/aggregation/products.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private searchProductsUseCase: SearchProductsUseCase) {}

  @Query(() => Products)
  async products(@Args('input', { nullable: true }) input: SearchProductsInput = new SearchProductsInput()) {
    const output = await this.searchProductsUseCase.handle(input);

    return output.products;
  }
}

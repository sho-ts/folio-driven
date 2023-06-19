import { InputType, Field, Int } from '@nestjs/graphql';
import { DisplayName } from '@/domain/object/creator/display-name.object';
import { ProductId } from '@/domain/object/product/product-id.object';

@InputType()
export class SearchProductsInput {
  @Field(() => String)
  keyword?: string;

  @Field(() => String)
  creatorDisplayName?: DisplayName;

  @Field(() => [String])
  productIds?: ProductId[];

  @Field(() => Int)
  order?: number;

  @Field(() => Int)
  limit?: number;

  constructor(input?: { keyword?: string; creatorDisplayName?: DisplayName; productIds?: ProductId[]; order?: number; limit?: number }) {
    this.keyword = input?.keyword;
    this.creatorDisplayName = input?.creatorDisplayName;
    this.productIds = input?.productIds;
    this.order = input?.order ?? 0;
    this.limit = input?.limit ?? 30;
  }
}

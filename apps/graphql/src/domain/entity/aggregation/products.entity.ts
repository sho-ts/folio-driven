import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '@/domain/entity/product/product.entity';
import { DisplayName } from '@/domain/object/creator/display-name.object';

@ObjectType()
export class Products {
  @Field(() => [Product], { nullable: true })
  items?: Product[];

  @Field(() => Int, { defaultValue: 0 })
  total = 0;

  // 検索用
  keyword?: string;
  creatorDisplayName?: DisplayName;
}

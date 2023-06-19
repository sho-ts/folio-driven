import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '@/domain/entity/product/product.entity';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { Creator } from '@/domain/entity/creator/creator.entity';

@ObjectType()
export class Creators {
  @Field(() => [Creator], { nullable: true })
  items?: Creator[];

  @Field(() => Int, { defaultValue: 0 })
  total = 0;

  // 検索用
  creatorIds?: CreatorId[];
}

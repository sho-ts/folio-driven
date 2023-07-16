import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductId } from '@/domain/object/product/product-id.object';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { ProductImage } from '@/domain/entity/product/product-image.entity';

@ObjectType()
export class ProductImages {
  @Field(() => [ProductImage], { nullable: true })
  items?: ProductImage[];

  @Field(() => Int, { defaultValue: 0 })
  total = 0;

  // 検索用
  productId?: ProductId;
  creatorId?: CreatorId;
}

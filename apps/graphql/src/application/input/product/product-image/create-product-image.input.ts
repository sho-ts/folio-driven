import { CognitoId } from '@/domain/object/cognito/cognito-id.object';
import { ProductId } from '@/domain/object/product/product-id.object';
import { ProductImageOrder } from '@/domain/object/product/product-image-order';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateProductImageInput {
  @Field(() => String)
  @IsNotEmpty()
  file: string;

  @Field(() => String)
  @IsNotEmpty()
  productId: ProductId;

  @Field(() => Int)
  @IsOptional()
  @Min(0)
  order: ProductImageOrder;

  cognitoId?: CognitoId;
}

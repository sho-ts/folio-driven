import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { InputType, Field } from '@nestjs/graphql';
import { ArrayMaxSize, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductWebsite } from '@/domain/entity/product/product-website.entity';
import { CognitoId } from '@/domain/object/cognito/cognito-id.object';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  @IsOptional()
  overview?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(20000)
  @IsOptional()
  description: string;

  @Field(() => [ProductHashtag], { nullable: true, defaultValue: [] })
  @IsOptional()
  @ArrayMaxSize(20)
  @Type(() => ProductHashtag)
  hashtags: ProductHashtag[];

  @Field(() => [ProductWebsite], { nullable: true, defaultValue: [] })
  @ArrayMaxSize(20)
  @IsOptional()
  @Type(() => ProductWebsite)
  websites: ProductWebsite[];

  cognitoId?: CognitoId;
}

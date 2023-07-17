import { InputType, Field, Int } from '@nestjs/graphql';
import { ArrayMaxSize, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CognitoId } from '@/domain/object/cognito/cognito-id.object';
import { ProductImageOrder } from '@/domain/object/product/product-image-order';
import { ProductWebsiteUrl } from '@/domain/object/product/product-website-url.object';
import { ProductWebsiteType } from '@/domain/object/product/product-website-type.object';
import { ProductHashtagName } from '@/domain/object/product/product-hashtag-name.object';
import { MediaUrl } from '@/domain/object/media/media-url.object';

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

  @Field(() => [CreateProductInputHashtag], { nullable: true, defaultValue: [] })
  @IsOptional()
  @ArrayMaxSize(20)
  @Type(() => CreateProductInputHashtag)
  hashtags: CreateProductInputHashtag[];

  @Field(() => [CreateProductInputWebsite], { nullable: true, defaultValue: [] })
  @ArrayMaxSize(20)
  @IsOptional()
  @Type(() => CreateProductInputWebsite)
  websites: CreateProductInputWebsite[];

  @Field(() => [CreateProductInputImage], { nullable: true, defaultValue: [] })
  @ArrayMaxSize(20)
  @IsOptional()
  @Type(() => CreateProductInputImage)
  images: CreateProductInputImage[];

  cognitoId?: CognitoId;
}

@InputType()
class CreateProductInputImage {
  @Field(() => String)
  @IsNotEmpty()
  url: MediaUrl;

  @Field(() => Int)
  @IsNotEmpty()
  order: ProductImageOrder;
}

@InputType()
class CreateProductInputWebsite {
  @Field(() => String)
  url: ProductWebsiteUrl;

  @Field(() => Int)
  websiteType: ProductWebsiteType;
}

@InputType()
class CreateProductInputHashtag {
  @Field(() => String)
  @MaxLength(20)
  hashtagName: ProductHashtagName;
}

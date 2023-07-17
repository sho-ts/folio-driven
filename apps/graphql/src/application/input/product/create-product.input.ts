import { InputType, Field, Int } from '@nestjs/graphql';
import { ArrayMaxSize, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CognitoId } from '@/domain/object/cognito/cognito-id.object';
import { ProductImageOrder } from '@/domain/object/product/product-image-order';
import { ProductWebsiteUrl } from '@/domain/object/product/product-website-url.object';
import { ProductWebsiteType } from '@/domain/object/product/product-website-type.object';
import { ProductHashtagName } from '@/domain/object/product/product-hashtag-name.object';
import { MediaUrl } from '@/domain/object/media/media-url.object';
import { Media } from '@/domain/entity/media/media.entity';
import { ProductWebsite } from '@/domain/entity/product/product-website.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { PRODUCT_STATUS } from '@/domain/object/product/product-status.object';
import { ProductImages } from '@/domain/entity/aggregation/product-images.entity';

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

  getMedias() {
    return this.images.map(({ url }) => {
      const media = new Media();
      media.cognitoId = this.cognitoId;
      media.url = url;
      return media;
    });
  }

  getWebsites(product?: Product) {
    return this.websites.map(({ url, websiteType }) => {
      const website = new ProductWebsite();
      website.url = url;
      website.websiteType = websiteType;
      website.product = product;
      return website;
    });
  }

  getHashtags(product?: Product) {
    return this.hashtags.map(({ hashtagName }) => {
      const hashtag = new ProductHashtag();
      hashtag.hashtagName = hashtagName;
      hashtag.product = product;
      return hashtag;
    });
  }

  getProductImages(product?: Product) {
    const items = this.images.map(({ url, order }) => {
      const productImage = new ProductImage();
      productImage.url = url;
      productImage.product = product;
      productImage.order = order;
      return productImage;
    });
    const productImages = new ProductImages();
    productImages.items = items;
    productImages.total = items.length;

    return productImages;
  }

  getCreator() {
    const creator = new Creator();
    creator.cognitoId = this.cognitoId;
    return creator;
  }

  getProduct() {
    const product = new Product();
    product.title = this.title;
    product.overview = this.overview;
    product.description = this.description;
    product.productStatus = PRODUCT_STATUS.PUBLIC;
    return product;
  }
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { ProductWebsite } from '@/domain/entity/product/product-website.entity';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Media } from '@/domain/entity/media/media.entity';

const TypeOrmFeature = TypeOrmModule.forFeature([Creator, Product, ProductWebsite, ProductHashtag, ProductImage, Media]);

@Module({
  imports: [TypeOrmFeature],
  exports: [TypeOrmFeature],
})
export class RepositoryModule {}

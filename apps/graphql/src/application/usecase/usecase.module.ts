import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { CreatorDataLoader } from '@/infrastructure/dataloader/creator.dataloader';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { DataLoaderModule } from '@/infrastructure/dataloader/dataloader.module';
import { ProductWebsiteRepository } from '@/infrastructure/repository/product-website.repository';
import { ProductHashtagRepository } from '@/infrastructure/repository/product-hashtag.repository';
import { ProductImageRepository } from '@/infrastructure/repository/product-image.repository';
import { S3Repository } from '@/infrastructure/repository/s3.repository';
import { MediaRepository } from '@/infrastructure/repository/media.repository';

@Module({
  imports: [RepositoryModule, DataLoaderModule],
  providers: [CreatorRepository, CreatorDataLoader, ProductRepository, ProductWebsiteRepository, ProductHashtagRepository, ProductImageRepository, S3Repository, MediaRepository],
  exports: [CreatorRepository, CreatorDataLoader, ProductRepository, ProductWebsiteRepository, ProductHashtagRepository, ProductImageRepository, S3Repository, MediaRepository],
})
export class UseCaseModule {}

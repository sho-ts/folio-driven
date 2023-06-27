import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { CreatorDataLoader } from '@/infrastructure/dataloader/creator.dataloader';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { DataLoaderModule } from '@/infrastructure/dataloader/dataloader.module';
import { ProductWebsiteRepository } from '@/infrastructure/repository/product-website.repository';
import { ProductHashtagRepository } from '@/infrastructure/repository/product-hashtag.repository';

@Module({
  imports: [RepositoryModule, DataLoaderModule],
  providers: [CreatorRepository, CreatorDataLoader, ProductRepository, ProductWebsiteRepository, ProductHashtagRepository],
  exports: [CreatorRepository, CreatorDataLoader, ProductRepository, ProductWebsiteRepository, ProductHashtagRepository],
})
export class UseCaseModule {}

import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { CreatorDataLoader } from '@/infrastructure/dataloader/creator.dataloader';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { DataLoaderModule } from '@/infrastructure/dataloader/dataloader.module';

@Module({
  imports: [RepositoryModule, DataLoaderModule],
  providers: [CreatorRepository, CreatorDataLoader, ProductRepository],
  exports: [CreatorRepository, CreatorDataLoader, ProductRepository],
})
export class UseCaseModule {}

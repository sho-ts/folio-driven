import { Module } from '@nestjs/common';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { RepositoryModule } from '@/infrastructure/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [CreatorRepository],
  exports: [CreatorRepository],
})
export class DataLoaderModule {}

import { RepositoryModule } from '@/infrastructure/repository/repository.module';
import { Module } from '@nestjs/common';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { ProductRepository } from '@/infrastructure/repository/product.repository';

@Module({
  imports: [RepositoryModule],
  providers: [CreatorRepository, ProductRepository],
  exports: [CreatorRepository, ProductRepository],
})
export class UseCaseModule {}

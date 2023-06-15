import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from '@/domain/entity/product/product.entity';

const TypeOrmFeature = TypeOrmModule.forFeature([Creator, Product]);

@Module({
  imports: [TypeOrmFeature],
  exports: [TypeOrmFeature],
})
export class RepositoryModule {}

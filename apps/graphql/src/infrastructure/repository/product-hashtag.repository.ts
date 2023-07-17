import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';

@Injectable()
export class ProductHashtagRepository {
  constructor(
    @InjectRepository(ProductHashtag)
    private repository: Repository<ProductHashtag>,
  ) {}

  async save(productHashtag: ProductHashtag, manager?: EntityManager) {
    return manager?.getRepository(ProductHashtag)?.save(productHashtag) ?? this.repository.save(productHashtag);
  }

  async saveAll(productHashtags: ProductHashtag[], manager?: EntityManager) {
    return manager?.getRepository(ProductHashtag)?.save(productHashtags) ?? this.repository.save(productHashtags);
  }
}

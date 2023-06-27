import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductWebsite } from '@/domain/entity/product/product-website.entity';

@Injectable()
export class ProductWebsiteRepository {
  constructor(
    @InjectRepository(ProductWebsite)
    private repository: Repository<ProductWebsite>,
  ) {}

  async save(productWebsite: ProductWebsite, maneger?: EntityManager) {
    return maneger?.getRepository(ProductWebsite)?.save(productWebsite) ?? this.repository.save(productWebsite);
  }

  async saveAll(productWebsites: ProductWebsite[], maneger?: EntityManager) {
    return maneger?.getRepository(ProductWebsite)?.save(productWebsites) ?? this.repository.save(productWebsites);
  }
}

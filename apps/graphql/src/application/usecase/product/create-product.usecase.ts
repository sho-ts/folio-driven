import { CreateProductInput } from '@/application/input/product/create-product.input';
import { CreateProductOutput } from '@/application/output/product/create-product.output';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { PRODUCT_STATUS } from '@/domain/object/product/product-status.object';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { ProductHashtagRepository } from '@/infrastructure/repository/product-hashtag.repository';
import { ProductWebsiteRepository } from '@/infrastructure/repository/product-website.repository';
import { ProductRepository } from '@/infrastructure/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectEntityManager(process.env.DB_NAME)
    private entityManager: EntityManager,
    private productRepository: ProductRepository,
    private productWebsiteRepository: ProductWebsiteRepository,
    private productHashtagRepository: ProductHashtagRepository,
    private creatorRepository: CreatorRepository,
  ) {}

  async handle(input: CreateProductInput) {
    try {
      const result = await this.entityManager.transaction(async (maneger) => {
        const creator = new Creator();
        creator.cognitoId = input.cognitoId;
        const findCreatorResult = await this.creatorRepository.find(creator);

        if (!findCreatorResult) throw new Error(`Creatorが見つかりません。 cognitoId: ${creator.cognitoId}`);

        // Insert Prodcut
        const product = new Product();
        product.title = input.title;
        product.overview = input.overview;
        product.description = input.description;
        product.hashtags = input.hashtags;
        product.creator = findCreatorResult;
        product.productStatus = PRODUCT_STATUS.PUBLIC;
        const saveProductResult = await this.productRepository.save(product, maneger);

        // Insert ProductWebsite
        const websites = input.websites.map((website) => {
          website.product = saveProductResult;
          return website;
        });
        const saveWebsitesResult = await this.productWebsiteRepository.saveAll(websites, maneger);
        saveProductResult.websites = saveWebsitesResult;

        // Insert ProductHashtag
        const hashtags = input.hashtags.map((hashtag) => {
          hashtag.product = saveProductResult;
          return hashtag;
        });
        const saveHashtagResult = await this.productHashtagRepository.saveAll(hashtags, maneger);
        saveProductResult.hashtags = saveHashtagResult;

        return saveProductResult;
      });
      return new CreateProductOutput(result);
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Productの作成に失敗しました。\n${e.message}`);
      }
      throw e;
    }
  }
}

import { CreateProductInput } from '@/application/input/product/create-product.input';
import { CreateProductOutput } from '@/application/output/product/create-product.output';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { MediaRepository } from '@/infrastructure/repository/media.repository';
import { ProductHashtagRepository } from '@/infrastructure/repository/product-hashtag.repository';
import { ProductImageRepository } from '@/infrastructure/repository/product-image.repository';
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
    private productImageRepository: ProductImageRepository,
    private mediaRepository: MediaRepository,
    private creatorRepository: CreatorRepository,
  ) {}

  async handle(input: CreateProductInput) {
    try {
      const result = await this.entityManager.transaction(async (manager) => {
        const medias = input.getMedias();
        const uploadedMedias = medias.length > 0 ? await this.mediaRepository.search(medias) : [];

        if (uploadedMedias.length !== medias.length) {
          throw new Error('自分のアップロードしたMedia以外をProduct以外に設定することはできません');
        }

        const creator = input.getCreator();
        const findCreatorResult = await this.creatorRepository.find(creator);

        if (!findCreatorResult) throw new Error(`Creatorが見つかりません。 cognitoId: ${creator.cognitoId}`);

        const product = input.getProduct();
        product.creator = findCreatorResult;
        const saveProductResult = await this.productRepository.save(product, manager);

        await Promise.all([
          this.productWebsiteRepository.saveAll(input.getWebsites(saveProductResult), manager),
          this.productHashtagRepository.saveAll(input.getHashtags(saveProductResult), manager),
          this.productImageRepository.saveAll(input.getProductImages(saveProductResult), manager),
        ]);

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

import { CreateMediaInput } from '@/application/input/media/create-media.input';
import { CreateMediaOutput } from '@/application/output/media/create-media.output';
import { MediaFile } from '@/domain/entity/media/media-file.entity';
import { Media } from '@/domain/entity/media/media.entity';
import { MediaRepository } from '@/infrastructure/repository/media.repository';
import { S3Repository } from '@/infrastructure/repository/s3.repository';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';

export class CreateMediaUseCase {
  constructor(
    @InjectEntityManager(process.env.DB_NAME)
    private entityManager: EntityManager,
    private readonly s3Repository: S3Repository,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async handle(input: CreateMediaInput) {
    try {
      const result = await this.entityManager.transaction(async (manager) => {
        const file = new MediaFile();
        file.object = input.object;
        file.fileId = v4();

        const media = new Media();
        media.cognitoId = input.cognitoId;
        media.mediaType = file.getMediaType();
        media.url = file.getUrl();

        const result = await this.mediaRepository.save(media, manager);

        // S3はtransactionができないため、
        // DBのインサートが完了してからS3にファイルをアップロードする
        await this.s3Repository.save(file);

        return result;
      });
      return new CreateMediaOutput(result);
    } catch (error) {
      console.error('Mediaの新規作成に失敗しました');
      throw error;
    }
  }
}

import { MediaFile } from '@/domain/entity/media/media-file.entity';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Repository {
  storage: AWS.S3;

  constructor() {
    AWS.config.credentials = new AWS.Credentials({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    });

    this.storage = new AWS.S3();
  }

  async save(media: MediaFile) {
    try {
      await this.storage
        .putObject({
          Key: media.getKey(),
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Body: media.getBuffer(),
          ContentType: media.getContentType(),
        })
        .promise();

      const result = new MediaFile();
      result.fileId = media.fileId;

      return result;
    } catch (e) {
      console.error('ファイルアップロードに失敗しました');
      console.error(e);
      throw e;
    }
  }
}

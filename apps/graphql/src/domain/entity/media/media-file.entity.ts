import { MEDIA_TYPE } from '@/domain/object/media/media-type.object';
import { MediaUrl } from '@/domain/object/media/media-url.object';

export class MediaFile {
  object?: string;
  fileId?: string;

  getKey() {
    return [this.fileId, this.getExtension()].join('.');
  }

  getUrl() {
    return [process.env.AWS_S3_BUCKET_URL, this.getKey()].join('/') as MediaUrl;
  }

  getBuffer() {
    return Buffer.from(this.object.replace(/^data:\w+\/\w+;base64,/, ''), 'base64');
  }

  getExtension() {
    return this.object.slice(this.object.indexOf('/') + 1, this.object.indexOf(';'));
  }

  getContentType() {
    return this.object.slice(this.object.indexOf(':') + 1, this.object.indexOf(';'));
  }

  getMediaType() {
    if (this.object.startsWith('data:video')) {
      return MEDIA_TYPE.MOVIE;
    }
    return MEDIA_TYPE.IMAGE;
  }
}

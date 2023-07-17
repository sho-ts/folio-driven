import { Media } from '@/domain/entity/media/media.entity';

export class CreateMediaOutput {
  constructor(readonly media: Media) {}
}

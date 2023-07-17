import { Media } from '@/domain/entity/media/media.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class MediaRepository {
  constructor(
    @InjectRepository(Media)
    private readonly repository: Repository<Media>,
  ) {}

  search(media: Media | Media[]) {
    return this.repository.findBy(media);
  }

  save(media: Media, manager?: EntityManager) {
    return manager?.getRepository(Media)?.save(media) ?? this.repository.save(media);
  }
}

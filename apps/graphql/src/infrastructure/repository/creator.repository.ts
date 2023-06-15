import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from '@/domain/entity/creator/creator.entity';

@Injectable()
export class CreatorRepository {
  constructor(
    @InjectRepository(Creator)
    private repository: Repository<Creator>,
  ) {}

  find(creator: Creator) {
    return this.repository.findOneBy({ displayName: creator.displayName });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Creators } from '@/domain/entity/aggregation/creators.entity';

@Injectable()
export class CreatorRepository {
  constructor(
    @InjectRepository(Creator)
    private repository: Repository<Creator>,
  ) {}

  find(creator: Creator) {
    return this.repository.findOneBy({ displayName: creator.displayName, creatorId: creator.creatorId, cognitoId: creator.cognitoId });
  }

  async search(creators: Creators) {
    const query = this.repository.createQueryBuilder('creator').where('creator.creatorId IN (:...creatorIds)', { creatorIds: creators.creatorIds });
    const [total, items] = await Promise.all([query.getCount(), query.getMany()]);

    const result = new Creators();
    result.total = total;
    result.items = items;

    return result;
  }
}

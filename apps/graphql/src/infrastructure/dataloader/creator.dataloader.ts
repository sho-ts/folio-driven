import * as DataLoader from 'dataloader';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Creators } from '@/domain/entity/aggregation/creators.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatorDataLoader extends DataLoader<CreatorId, Creator> {
  constructor(private creatorRepository: CreatorRepository) {
    super(async (creatorIds) => {
      const creators = new Creators();
      creators.creatorIds = [...creatorIds];

      const result = await this.creatorRepository.search(creators);
      return result.items;
    });
  }
}

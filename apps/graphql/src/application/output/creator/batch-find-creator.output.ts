import { Creator } from '@/domain/entity/creator/creator.entity';

export class BatchFindCreatorOutput {
  constructor(readonly creator: Creator) {}
}

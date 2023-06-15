import { Creator } from '@/domain/entity/creator/creator.entity';

export class FindCreatorOutput {
  constructor(readonly creator: Creator) {}
}

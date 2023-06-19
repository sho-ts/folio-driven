import { CreatorId } from '@/domain/object/creator/creator-id.object';

export class BatchFindCreatorInput {
  creatorId?: CreatorId;

  constructor(input: { creatorId?: CreatorId }) {
    this.creatorId = input.creatorId;
  }
}

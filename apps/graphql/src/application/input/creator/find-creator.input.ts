import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { DisplayName } from '@/domain/object/creator/display-name.object';

export class FindCreatorInput {
  displayName?: DisplayName;
  creatorId?: CreatorId;

  constructor(input: { displayName?: DisplayName; creatorId?: CreatorId }) {
    this.displayName = input.displayName;
    this.creatorId = input.creatorId;
  }
}

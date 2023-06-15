import { DisplayName } from '@/domain/object/creator/display-name.object';

export class FindCreatorInput {
  constructor(readonly displayName: DisplayName) {}
}

import { BatchFindCreatorInput } from '@/application/input/creator/batch-find-creator.input';
import { BatchFindCreatorOutput } from '@/application/output/creator/batch-find-creator.output';
import { CreatorDataLoader } from '@/infrastructure/dataloader/creator.dataloader';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchFindCreatorUseCase {
  constructor(private creatorDataLoader: CreatorDataLoader) {}

  async handle(input: BatchFindCreatorInput) {
    const creator = await this.creatorDataLoader.load(input.creatorId);

    return new BatchFindCreatorOutput(creator);
  }
}

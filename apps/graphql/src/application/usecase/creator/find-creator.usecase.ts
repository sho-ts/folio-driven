import { FindCreatorInput } from '@/application/input/creator/find-creator.input';
import { FindCreatorOutput } from '@/application/output/creator/find-creator.output';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { CreatorRepository } from '@/infrastructure/repository/creator.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCreatorUseCase {
  constructor(private creatorRepository: CreatorRepository) {}

  async handle(input: FindCreatorInput) {
    const creator = new Creator();
    creator.displayName = input.displayName;

    const result = await this.creatorRepository.find(creator);

    return new FindCreatorOutput(result);
  }
}

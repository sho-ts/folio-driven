import { CreateMediaInput } from '@/application/input/media/create-media.input';
import { Guard } from '@/application/middleware/auth';
import { CreateMediaUseCase } from '@/application/usecase/media/create-media.usecase';
import { CognitoUser } from '@/domain/entity/cognito/cognito-user.entity';
import { Media } from '@/domain/entity/media/media.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly createMediaUseCase: CreateMediaUseCase) {}

  @Mutation(() => Media)
  async createMedia(@Guard({ required: true }) user: CognitoUser, @Args('input') input: CreateMediaInput) {
    input.cognitoId = user.cognitoId;
    const output = await this.createMediaUseCase.handle(input);

    return output.media;
  }
}

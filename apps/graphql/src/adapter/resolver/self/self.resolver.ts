import { Resolver, Query } from '@nestjs/graphql';
import { CognitoUser } from '@/domain/entity/cognito/cognito-user.entity';
import { Guard } from '@/application/middleware/auth';

@Resolver(() => CognitoUser)
export class SelfResolver {
  @Query(() => CognitoUser, { nullable: true })
  async self(@Guard() cognitoUser: CognitoUser) {
    return cognitoUser;
  }
}

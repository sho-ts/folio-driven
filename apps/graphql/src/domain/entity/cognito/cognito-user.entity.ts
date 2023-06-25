import { JwtPayload } from 'jsonwebtoken';
import { CognitoId } from '@/domain/object/cognito/cognito-id.object';
import { CognitoEmail } from '@/domain/object/cognito/cognito-email.object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CognitoUser {
  @Field(() => String)
  cognitoId: CognitoId;

  @Field(() => String)
  email: CognitoEmail;

  emailVerified: boolean;

  constructor(user: JwtPayload) {
    this.cognitoId = user.sub as CognitoId;
    this.email = user.email as CognitoEmail;
    this.emailVerified = user.email_verified;
  }
}

import { CognitoId } from '@/domain/object/cognito/cognito-id.object';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMediaInput {
  @Field(() => String)
  @IsNotEmpty()
  object: string;

  cognitoId?: CognitoId;
}

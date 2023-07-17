import { Column, Entity, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MediaId } from '@/domain/object/media/media-id.object';
import { MediaUrl } from '@/domain/object/media/media-url.object';
import { MediaType } from '@/domain/object/media/media-type.object';
import { CognitoId } from '@/domain/object/cognito/cognito-id.object';

@Entity({ synchronize: false })
@ObjectType()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  mediaId: MediaId;

  @Column()
  @Field(() => String)
  url: MediaUrl;

  @Column()
  @Field(() => Int)
  mediaType: MediaType;

  @Column()
  cognitoId: CognitoId;
}

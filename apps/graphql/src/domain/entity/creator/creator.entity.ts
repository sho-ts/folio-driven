import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { NickName } from '@/domain/object/creator/nick-name.object';
import { Product } from '@/domain/entity/product/product.entity';
import { DisplayName } from '@/domain/object/creator/display-name.object';
import { Products } from '../aggregation/products.entity';

@Entity()
@ObjectType()
export class Creator {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  creatorId: CreatorId;

  @Column()
  @Field(() => String)
  nickName: NickName;

  @Column({ unique: true })
  @Field(() => String)
  displayName: DisplayName;

  @OneToMany(() => Product, (product) => product.creator)
  @JoinColumn()
  @Field(() => Products)
  products: Product[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { ProductId } from '@/domain/object/product/product-id.object';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { ProductStatus } from '@/domain/object/product/product-status.object';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { ProductWebsite } from './product-website.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  productId: ProductId;

  @Column()
  @Field(() => Int)
  productStatus: ProductStatus;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  overview: string;

  @Column({ type: 'text' })
  @Field(() => String)
  description: string;

  @OneToMany(() => ProductHashtag, (productHashtag) => productHashtag.product)
  @JoinColumn()
  hashTags: ProductHashtag[];

  @OneToMany(() => ProductWebsite, (productWebsite) => productWebsite.product)
  @JoinColumn()
  websites: ProductWebsite[];

  @ManyToOne(() => Creator, (creator) => creator.products)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Creator)
  creator: Creator;

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

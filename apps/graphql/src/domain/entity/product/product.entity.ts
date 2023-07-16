import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, JoinColumn, ManyToOne, DeleteDateColumn, RelationId } from 'typeorm';
import { ProductId } from '@/domain/object/product/product-id.object';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { ProductStatus } from '@/domain/object/product/product-status.object';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { ProductWebsite } from './product-website.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { ProductImage } from './product-image.entity';
import { ProductImages } from '../aggregation/product-images.entity';

@Entity({ synchronize: false })
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

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  overview: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description: string;

  @OneToMany(() => ProductHashtag, (productHashtag) => productHashtag.product)
  @JoinColumn()
  hashtags: ProductHashtag[];

  @OneToMany(() => ProductWebsite, (productWebsite) => productWebsite.product)
  @JoinColumn()
  websites: ProductWebsite[];

  @ManyToOne(() => Creator, (creator) => creator.products)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Creator)
  creator: Creator;

  @OneToMany(() => ProductImage, (productImage) => productImage.creator)
  @JoinColumn()
  @Field(() => ProductImages, { nullable: true })
  productImages: ProductImage[];

  @RelationId((product: Product) => product.creator)
  @Field(() => String)
  creatorId: CreatorId;

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

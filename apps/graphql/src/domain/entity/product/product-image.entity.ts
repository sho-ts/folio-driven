import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, RelationId } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductImageId } from '@/domain/object/product/product-image-id';
import { ProductImageOrder } from '@/domain/object/product/product-image-order';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from './product.entity';
import { ProductId } from '@/domain/object/product/product-id.object';
import { CreatorId } from '@/domain/object/creator/creator-id.object';
import { MediaUrl } from '@/domain/object/media/media-url.object';

@Entity({ synchronize: false })
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  productImageId: ProductImageId;

  @Column({ type: 'text' })
  @Field(() => String)
  url: MediaUrl;

  @Column()
  @Field(() => Int)
  order: ProductImageOrder;

  @ManyToOne(() => Creator, (creator) => creator.products)
  @JoinColumn({ name: 'creatorId' })
  creator: Creator;

  @RelationId((productImage: ProductImage) => productImage.creator)
  creatorId: CreatorId;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'productId' })
  product: Creator;

  @RelationId((productImage: ProductImage) => productImage.product)
  productId: ProductId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, RelationId } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductImageId } from '@/domain/object/product/product-image-id';
import { ProductImageOrder } from '@/domain/object/product/product-image-order';
import { ProductImageUrl } from '@/domain/object/product/product-image-url';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from './product.entity';
import { ProductId } from '@/domain/object/product/product-id.object';

@Entity()
@ObjectType()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  productImageId: ProductImageId;

  @Column({ type: 'text' })
  @Field(() => String)
  url: ProductImageUrl;

  @Column()
  @Field(() => Int)
  order: ProductImageOrder;

  @ManyToOne(() => Creator, (creator) => creator.products)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Creator)
  creator: Creator;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'productId' })
  @Field(() => Product)
  product: Creator;

  @RelationId((productImage: ProductImage) => productImage.product)
  @Field(() => String)
  productId: ProductId;

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

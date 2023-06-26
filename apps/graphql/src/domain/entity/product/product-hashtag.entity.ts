import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductHashtagId } from '@/domain/object/product/product-hashtag-id.object';
import { ProductHashtagName } from '@/domain/object/product/product-hashtag-name.object';
import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@Entity()
@InputType()
export class ProductHashtag {
  @PrimaryGeneratedColumn('uuid')
  hashtagId: ProductHashtagId;

  @Column()
  @Field(() => String)
  @MaxLength(20)
  hashtagName: ProductHashtagName;

  @ManyToOne(() => Product, (product) => product.hashtags)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

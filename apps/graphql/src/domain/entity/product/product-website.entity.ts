import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductWebsiteId } from '@/domain/object/product/product-website-id.object';
import { ProductWebsiteUrl } from '@/domain/object/product/product-website-url.object';
import { ProductWebsiteType } from '@/domain/object/product/product-website-type.object';
import { Field, InputType, Int } from '@nestjs/graphql';

@Entity({ synchronize: false })
@InputType()
export class ProductWebsite {
  @PrimaryGeneratedColumn('uuid')
  productWebsiteId: ProductWebsiteId;

  @Column({ type: 'text' })
  @Field(() => String)
  url: ProductWebsiteUrl;

  @Column()
  @Field(() => Int)
  websiteType: ProductWebsiteType;

  @ManyToOne(() => Product, (product) => product.websites)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

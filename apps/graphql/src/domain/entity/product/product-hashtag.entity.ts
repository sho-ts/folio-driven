import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductHashtagId } from '@/domain/object/product/product-hashtag-id.object';
import { ProductHashtagName } from '@/domain/object/product/product-hashtag-name.object';

@Entity()
export class ProductHashtag {
  @PrimaryGeneratedColumn('uuid')
  hashtagId: ProductHashtagId;

  @Column()
  hashtagName: ProductHashtagName;

  @ManyToOne(() => Product, (product) => product.hashTags)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ResolverModule } from '@/adapter/resolver/resolver.module';
import { Creator } from '@/domain/entity/creator/creator.entity';
import { Product } from '@/domain/entity/product/product.entity';
import { ProductHashtag } from '@/domain/entity/product/product-hashtag.entity';
import { Company } from '@/domain/entity/company/company.entity';
import { ProductWebsite } from '@/domain/entity/product/product-website.entity';
import { join } from 'path';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Media } from '@/domain/entity/media/media.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Product, ProductWebsite, ProductHashtag, ProductImage, Creator, Company, Media],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
    }),
    ResolverModule,
  ],
  providers: [],
})
export class AppModule {}

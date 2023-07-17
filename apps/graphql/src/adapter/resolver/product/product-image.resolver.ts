import { CreateProductImageInput } from '@/application/input/product/product-image/create-product-image.input';
import { Guard } from '@/application/middleware/auth';
import { CreateProductImageUseCase } from '@/application/usecase/product/product-image/create-product-image.usecase';
import { CognitoUser } from '@/domain/entity/cognito/cognito-user.entity';
import { ProductImage } from '@/domain/entity/product/product-image.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => ProductImage)
export class ProductImageResolver {
  constructor(private readonly createProductImageUseCase: CreateProductImageUseCase) {}

  @Mutation(() => ProductImage)
  async createProductImage(@Guard({ required: true }) user: CognitoUser, @Args('input') input: CreateProductImageInput) {
    input.cognitoId = user.cognitoId;
    const output = await this.createProductImageUseCase.handle(input);

    return output.productImage;
  }
}

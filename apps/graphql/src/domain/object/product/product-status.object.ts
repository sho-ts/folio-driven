import { Enum, withBrand } from '@/utility/type';

export const PRODUCT_STATUS = withBrand(
  {
    DRAFT: 0,
    PUBLIC: 1,
  } as const,
  'ProductStatus',
);

export type ProductStatus = Enum<typeof PRODUCT_STATUS>;

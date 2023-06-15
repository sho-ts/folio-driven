import { Brand, Enum } from '@/utility/type';

export const PRODUCT_STATUS = {
  DRAFT: 0,
  PUBLIC: 1,
} as const;

export type ProductStatus = Brand<Enum<typeof PRODUCT_STATUS>, 'ProductStatus'>;

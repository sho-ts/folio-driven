import { Enum, withBrand } from '@/utility/type';

export const PRODUCT_WEBSITE_TYPE = withBrand(
  {
    OTHER: 0,
    PRODUCT: 1,
    GITHUB: 2,
    ZENN: 3,
    QIITA: 4,
  } as const,
  'ProductWebSiteType',
);

export type ProductWebsiteType = Enum<typeof PRODUCT_WEBSITE_TYPE>;

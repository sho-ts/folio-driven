import { Brand, Enum } from '@/utility/type';

export const PRODUCT_WEBSITE_TYPE = {
  OTHER: 0,
  PRODUCT: 1,
  GITHUB: 2,
  ZENN: 3,
  QIITA: 4,
} as const;

export const PRODUCT_WEBSITE_TYPE_JAPANESE = {
  OTHER: '指定なし',
  PRODUCT: 'プロダクト',
  GITHUB: 'GitHub',
  ZENN: 'Zenn',
  QIITA: 'Qiita',
} as const;

export type ProductWebsiteType = Brand<Enum<typeof PRODUCT_WEBSITE_TYPE>, 'ProductWebsiteType'>;

export const getProductWebsiteTypeJapanese = (productWebsiteType: ProductWebsiteType) => {
  switch (productWebsiteType) {
    case PRODUCT_WEBSITE_TYPE.PRODUCT:
      return PRODUCT_WEBSITE_TYPE_JAPANESE.PRODUCT;
    case PRODUCT_WEBSITE_TYPE.GITHUB:
      return PRODUCT_WEBSITE_TYPE_JAPANESE.GITHUB;
    case PRODUCT_WEBSITE_TYPE.ZENN:
      return PRODUCT_WEBSITE_TYPE_JAPANESE.ZENN;
    case PRODUCT_WEBSITE_TYPE.QIITA:
      return PRODUCT_WEBSITE_TYPE_JAPANESE.QIITA;
    default:
      return PRODUCT_WEBSITE_TYPE_JAPANESE.OTHER;
  }
};

import { Enum, withBrand } from '@/utility/type';

export const MEDIA_TYPE = withBrand(
  {
    IMAGE: 0,
    MOVIE: 1,
  } as const,
  'MediaType',
);

export type MediaType = Enum<typeof MEDIA_TYPE>;

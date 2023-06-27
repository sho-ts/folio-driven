export type Brand<T, B> = T & { __brand: B };

export type Enum<T extends { [k: string]: unknown }> = T[keyof T];

export const withBrand = <T extends { [k: string]: unknown }, B extends string>(obj: T, brand: B) => {
  return obj as Record<keyof T, T[keyof T] & { __Brand: typeof brand }>;
};

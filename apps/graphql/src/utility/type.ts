export type Brand<T, B> = T & { __brand: B };

export type Enum<T extends { [k: string]: unknown }> = T[keyof T];

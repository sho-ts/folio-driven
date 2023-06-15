export const safeWhere = <T extends string>(where: T, value: { [k: string]: unknown }): [T | '1=1', { [k: string]: unknown }] => {
  const values = Object.values(value).filter((v) => v);

  const query = values.length > 0 ? where : '1=1';

  return [query, value];
};

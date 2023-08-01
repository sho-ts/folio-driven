module.exports = {
  src: './',
  language: 'typescript', // "javascript" | "typescript" | "flow"
  schema: '../graphql/schema.gql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};

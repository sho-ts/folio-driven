import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../graphql/schema.gql',
  documents: 'app/**/*.(ts|tsx)',
  generates: {
    'schema/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          DateTime: 'Date',
        },
      },
      hooks: {
        afterOneFileWrite: 'prettier --write',
      },
    },
    'schema/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;

import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: false,
  verbose: true,
  errorsOnly: true,
  generates: {
    // 🔹 1. Types + hooks for all operations
    "./src/apollo/graphql/_generated_/hooks.ts": {
      schema: "http://127.0.0.1:8000/graphql",
      documents: ["apollo/graphql/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        onlyOperationTypes: true,
        preResolveTypes: true,
        mergeFragmentTypes: true,
        defaultBaseOptions: {
          context: { clientName: "apiGraph" },
        },
        scalars: {
          DateTime: "Date",
        },
      },
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },

    // 🔹 2. Separate fragment types (helpful for reuse and better fragment typing)
    "./apollo/graphql/_generated_/fragments.ts": {
      schema: "http://127.0.0.1:8000/graphql",
      documents: ["apollo/graphql/fragments/**/*.graphql"],
      plugins: ["typescript", "typescript-operations"],
      config: {
        enumsAsTypes: true,
        onlyOperationTypes: false,
      },
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },

    // 🔹 3. Optional: Generate raw GraphQL document strings (useful for SSR, caching)
    "./apollo/graphql/_generated_/documents.ts": {
      schema: "http://127.0.0.1:8000/graphql",
      documents: ["apollo/graphql/**/*.graphql"],
      plugins: ["typed-document-node"],
      config: {
        noGraphQLTag: true,
      },
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },

    // 🔹 4. For Apollo Client's fragment matcher
    "./apollo/graphql/_generated_/FragmentsPossibleTypes.ts": {
      schema: "http://127.0.0.1:8000/graphql",
      documents: ["apollo/graphql/**/*.graphql"],
      plugins: ["fragment-matcher"],
      config: {},
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;

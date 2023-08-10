module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "solid",
    "import",
    "sort-keys-fix",
    "typescript-sort-keys",
    "unused-imports",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:solid/typescript",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": ["camelCase"],
      },
      {
        "selector": "variable",
        "format": ["PascalCase", "camelCase", "UPPER_CASE"],
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"],
      },
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
        },
      },
    ],
    "import/no-duplicates": "error",
    "sort-keys-fix/sort-keys-fix": "error",
    "typescript-sort-keys/interface": "error",
    "unused-imports/no-unused-imports": "error",
  },
  "overrides": [
    {
      "files": ["**/*.ts"],
      "rules": {
        "@typescript-eslint/no-floating-promises": "error",
      },
      "parserOptions": {
        "project": ["./tsconfig.json"],
      },
    },
  ],
};

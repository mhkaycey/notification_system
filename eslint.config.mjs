// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       "prettier/prettier": ["error", { endOfLine: "auto" }],
//     },
//   },
// );

// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Global ignores
  {
    ignores: [
      'node_modules',
      'dist', // <-- Good to add this
      'eslint.config.mjs', // You already had this
    ],
  },

  // 2. Base configs for ALL files
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs', // Applies to your JS files
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  // 3. Specific config for TypeScript files (Type-Checked)
  {
    files: ['**/*.ts', '**/*.tsx'], // <-- The key fix: only run this on TS files
    ...tseslint.configs.recommendedTypeChecked, // All type-aware rules
    languageOptions: {
      parserOptions: {
        projectService: true, // Finds your tsconfig.json
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Your existing rules are great
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // This is the rule that was firing.
      // Now that it's properly scoped, the error on @IsString()
      // should disappear without having to disable the rule.
      '@typescript-eslint/no-unsafe-call': 'error',
    },
  },
);

import { dirname } from "path";
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Extend Next.js and Prettier configs
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),

  // Add custom config with plugins and rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      // Import your plugins
      'check-file': (await import('eslint-plugin-check-file')).default,
      'n': (await import('eslint-plugin-n')).default,
    },
    rules: {
      // JavaScript style rules
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'semi': ['error'],
      'quotes': ['error', 'double'],

      // Node environment rule
      'n/no-process-env': ['error'],

      // File naming convention rules
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE'
        },
        {
          ignoreMiddleExtensions: true
        }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!^[.*': 'KEBAB_CASE'
        }
      ]
    }
  }
];

export default eslintConfig;
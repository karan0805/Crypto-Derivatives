module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  bracketSpacing: true,
  singleQuote: true,
  semi: true,
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$|^components/(.*)$',
    '^#/lib/(.*)$',
    '^@/styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

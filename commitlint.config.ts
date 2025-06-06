/* eslint-disable no-restricted-exports */
export default {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [
    2,
    'always',
    [
      'feat',
      'fix',
      'docs',
      'chore',
      'style',
      'refactor',
      'ci',
      'test',
      'revert',
      'perf',
      'vercel',
    ],
  ],
};

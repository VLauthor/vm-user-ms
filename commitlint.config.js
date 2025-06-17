module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 150],
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'merge',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      ['config', 'user', 'logger', 'dto', 'test', 'ci', 'husky', 'docker'],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
  },
};

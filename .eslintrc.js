module.exports = {
  'extends': [
    'rax'
  ],
  'root': true,
  'rules': {
    'import/no-extraneous-dependencies': [
      'error',
      {
        'peerDependencies': true,
        'devDependencies': [
          '**/scripts/*.js',
          '**/__tests__/*.test.js',
          '**/__tests__/**/*.js',
          '**/*.config.js',
          '**/config/*.js',
          '**/*.conf.js',
          '**/tests/*.test.js',
        ],
      },
    ],
  }
};

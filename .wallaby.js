module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'test/**/*.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'ava',
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['@ava/babel-preset-stage-4']
      })
    },
  };
};
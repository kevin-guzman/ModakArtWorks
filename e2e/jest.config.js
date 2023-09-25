/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  preset:'ts-jest',
  // setupFiles
  // transformIgnorePatterns : ["/node_modules/@react-native-community/async-storage/(?!(lib))"],
  // setupFilesAfterEnv: [
  //   '<rootDir>/e2e/setupFile.js',
  // ],
  setupFiles:[
    "<rootDir>/e2e/setupFile.js"
  ]
  //testEnvironment: "node",
  // setupTestFrameworkScriptFile: "./init.ts"
};

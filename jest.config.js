module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/*.ts', '!<rootDir>/src/cli.ts'],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/utils',
    '<rootDir>/src/types',
    '<rootDir>/src/base.ts',
  ],
};

export default {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.model.ts',
    '!<rootDir>/src/**/server.ts',
    '!<rootDir>/src/**/test/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  roots: ['<rootDir>/src'],
  watchPathIgnorePatterns: [ "globalConfig"],
};
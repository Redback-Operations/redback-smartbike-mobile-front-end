module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    collectCoverageFrom: [
      'src/components/**/*.{js,jsx}',
      '!src/components/**/*.test.{js,jsx}',
      '!src/components/**/*.d.ts',
    ],
    coverageThreshold: {
      global: {
        branches: 15,
        functions: 15,
        lines: 15,
        statements: 15,
      },
    },
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
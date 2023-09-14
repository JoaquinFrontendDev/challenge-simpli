import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const config: import('jest').Config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: './jest/globalSetup.ts',
  globalTeardown: './jest/globalTeardown.ts',
}

export default createJestConfig(config)

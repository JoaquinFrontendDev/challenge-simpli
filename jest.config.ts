import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */

const config: import('jest').Config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: './jest/globalSetup.ts',
  globalTeardown: './jest/globalTeardown.ts',
}

export default createJestConfig(config)

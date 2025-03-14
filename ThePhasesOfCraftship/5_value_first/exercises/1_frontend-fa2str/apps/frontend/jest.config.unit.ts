import * as path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Import JSON with assert
// import tsconfig from '../../tsconfig.json' assert { type: 'json' };

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // Add test match pattern for .unit.ts and .unit.tsx files
  testMatch: [
    '**/*.unit.ts',
    '**/*.unit.tsx'
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      }
    ]
  }
} satisfies JestConfigWithTsJest;

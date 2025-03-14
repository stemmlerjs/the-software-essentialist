import * as path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Import JSON with assert
// import tsconfig from '../../tsconfig.json' assert { type: 'json' };

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Add these two lines to mock CSS/SVG/etc. so Jest won't try to parse them:
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts'
  },
  // Add test match pattern for .unit.ts and .unit.tsx files
  testMatch: [
    '**/*.unit.ts',
    '**/*.unit.tsx'
  ],
  testPathIgnorePatterns: [
     '<rootDir>/jest.config.unit.ts'
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      { tsconfig: 'tsconfig.test.json' }
    ]
  }
} satisfies JestConfigWithTsJest;

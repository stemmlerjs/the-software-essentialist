import * as path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  silent: false,
  moduleNameMapper: {
    // Handle the @ alias from your tsconfig
    '^@/(.*)$': '<rootDir>/src/$1',
    // Keep your existing CSS/file mappings
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.ts',
  },
  // Add test match pattern for .unit.ts and .unit.tsx files
  testMatch: [
    '<rootDir>/src/**/*.unit.ts',
    '<rootDir>/src/**/*.unit.tsx',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/jest.config.unit.ts'
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: false,
      tsconfig: 'tsconfig.json'
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;
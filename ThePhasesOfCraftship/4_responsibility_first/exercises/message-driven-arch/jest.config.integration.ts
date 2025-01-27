import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (Infra)',
  testMatch: ['**/@(src|tests)/**/*.@(integration|api).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  maxWorkers: 1,
});

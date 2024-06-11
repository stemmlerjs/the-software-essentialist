import * as path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../../tsconfig.json';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Frontend (E2E)',
  testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { diagnostics: false }],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: path.resolve(__dirname, '../../'),
  }),
  passWithNoTests: true
});


import path from 'path';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../../tsconfig.json';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (Unit)',
  testMatch: ['**/@(src|tests)/**/*.@(unit).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: path.resolve(__dirname, '../../'),
  })
});
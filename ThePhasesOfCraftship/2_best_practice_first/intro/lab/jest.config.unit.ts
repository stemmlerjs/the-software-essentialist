import { Config } from "jest";

export default async (): Promise<Config> => ({
  verbose: true,
  projects: [
    "./packages/backend/jest.config.unit.ts",
    "./packages/shared/jest.config.unit.ts",
    "./packages/frontend/jest.config.unit.ts",
  ],
  // Run one at a time to avoid port and other conflicts
  maxWorkers: 1,
});

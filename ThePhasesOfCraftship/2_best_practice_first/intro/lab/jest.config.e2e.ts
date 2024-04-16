import { Config } from "jest";

export default async (): Promise<Config> => ({
  verbose: true,
  projects: [
    "./packages/backend/jest.config.e2e.ts",
    "./packages/frontend/jest.config.e2e.ts",
  ],
  // Run one at a time to avoid port and other conflicts
  maxWorkers: 1,
});

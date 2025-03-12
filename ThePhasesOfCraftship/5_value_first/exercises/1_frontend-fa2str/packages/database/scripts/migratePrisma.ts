
import { execSync } from "child_process";
import path from "path";

import { Config } from "@dddforum/config";

/**
 * 1) Loads config
 * 2) Sets DATABASE_URL environment variable
 * 3) Runs Prisma CLI in the same process
 */
(function main() {
  try {
    // 2. Load config
    const config = Config(/* dev = false if you want production mode */);

    // 3. Set DATABASE_URL from your config object
    process.env.DATABASE_URL = config.database.connectionString;

    // 4. Run Prisma generate
    execSync(
      "npx prisma migrate dev --schema=./src/prisma/schema.prisma", 
      {
        cwd: path.join(__dirname, ".."),  // ensure we run this from `packages/database` root
        stdio: "inherit",
      }
    );
  } catch (error) {
    console.error("Failed to run prisma generate with config:", error);
    process.exit(1);
  }
})(); 
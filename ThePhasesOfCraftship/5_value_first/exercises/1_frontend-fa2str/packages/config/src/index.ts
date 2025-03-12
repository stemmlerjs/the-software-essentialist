
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

// make sure you have the top level object keys, even empty like this: stack: {}
const configSchema = (dev: boolean = true) =>
  z.object({
      database: z.object({
          adminPassword: z.string(),
          connectionString: z.string()
      })
  });

export type Config = z.infer<ReturnType<typeof configSchema>>;

export const Config = (dev: boolean = true) => {
    const cwd = process.cwd();

    const env = process.env.ENV_FILE;

    if (env) dev = false;

    // If ENV_FILE is provided, use it, otherwise try to read from file in root
    const configContent = env
        ? JSON.parse(env)
        : JSON.parse(readFileSync(join(cwd, "../../env.json"), "utf-8"));

    const parsed = configSchema(dev).parse(configContent);

    return parsed;
};

import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

export type Environment = "development" | "production" | "staging" | "ci";
export type Script = "test:unit" | "test:e2e" | "start" | "test:infra";

const configSchema = (dev: boolean = true) =>
  z.object({
    api: z.object({
      url: z.string()
    }),
    database: z.object({
      adminPassword: z.string(),
      connectionString: z.string()
    }),
    webserver: z.object({
      port: z.number()
    }),
    auth: z.object({
      firebase: z.object({
        apiKey: z.string(),
        domain: z.string(), 
        projectId: z.string(),
        storageBucket: z.string(),
        messagingSender: z.string(),
        appId: z.string()
      })
    }),
    environment: z.enum(["development", "production", "staging", "ci"]).default("development"),
    script: z.enum(["test:unit", "test:e2e", "start", "test:infra"]).optional()
  });

export type Config = z.infer<ReturnType<typeof configSchema>> & {
  getEnvironment: () => Environment;
  getScript: () => Script | undefined;
};

export const Config = (dev: boolean = true) => {
    const cwd = process.cwd();
    const env = process.env.ENV_FILE;
    if (env) dev = false;

    // If ENV_FILE is provided, use it, otherwise try to read from file in root
    const configContent = env
        ? JSON.parse(env)
        : JSON.parse(readFileSync(join(cwd, "../../env.json"), "utf-8"));

    const parsed = configSchema(dev).parse(configContent);

    return {
        ...parsed,
        getEnvironment: () => parsed.environment,
        getScript: () => parsed.script
    };
};

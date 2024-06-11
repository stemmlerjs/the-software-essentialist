export type Environment = "development" | "production" | "staging" | "ci";

export type Script =
  | "test:unit"
  | "test:e2e"
  | "start:dev"
  | "start:prod"
  | "test:infra";

export class Config {
  env: Environment;
  script: Script;

  constructor(script: Script) {
    this.env = (process.env.NODE_ENV as Environment) || "development";
    this.script = script;
  }
}

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
  apiURL: string;

  constructor(script: Script) {
    this.env = (process.env.NODE_ENV as Environment) || "development";
    this.script = script;
    this.apiURL = this.getAPIURL();
  }

  getEnvironment() {
    return this.env;
  }

  getScript() {
    return this.script;
  }

  getAPIURL() {
    const fallback = "http://localhost:3000";
    if (this.isStaging()) {
      return process.env.API_URL_STAGING || fallback
    }

    return fallback
  }

  isStaging() {
    return this.env === "staging";
  }
}


export type Environment = "development" | "production" | "staging" | "ci";

export type Script =
  | "test:unit"
  | "test:e2e"
  | "start"
  | "test:infra";

export class AppConfig {
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
    return "http://localhost:3000";
  }

  get auth0 () {
    // Todo: build the env check abstraction
    return {
      domain: process.env.AUTH0_DOMAIN as string,
      clientId: process.env.AUTH0_CLIENT_ID  as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      audience: process.env.AUTH0_AUDIENCE as string,
    }
  }
}

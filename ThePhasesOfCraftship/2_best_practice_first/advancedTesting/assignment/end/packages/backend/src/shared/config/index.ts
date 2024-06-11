
export type Environment = 'development' | 'production' | 'staging' | 'ci' | undefined;

export type Script = 'test:unit' | 'test:e2e' | 'start:dev' | 'start:prod' | 'test:infra';

export class Config {
  env: Environment;
  script: Script;

  constructor (script: Script) {
    // Todo: Check invalid script to environment / (also known as intent)
    this.env = process.env.NODE_ENV as Environment;
    this.script = script;
  }
}

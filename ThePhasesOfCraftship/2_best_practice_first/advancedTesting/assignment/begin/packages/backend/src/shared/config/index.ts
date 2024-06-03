
export type Environment = 'development' | 'production' | 'staging' | 'ci';;

export type Context = 'test:unit' | 'test:e2e' | 'start:dev' | 'start:prod' | 'test:infra'

export class Config {
  env: Environment;
  context: Context;

  constructor (context: Context) {
    this.env = process.env.NODE_ENV as Environment || 'development';
    this.context = context;
  }
}
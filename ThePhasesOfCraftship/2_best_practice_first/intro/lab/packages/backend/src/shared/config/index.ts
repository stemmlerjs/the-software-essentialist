
export type Environment = 'development' | 'test' | 'production' | 'staging' | undefined;

export const config = {
  context: {
    env: process.env.NODE_ENV as Environment
  }
}
export type Environment = "development" | "test" | "production";

export const config = {
  context: {
    env: (process.env.NODE_ENV ?? "development") as Environment,
  },
};

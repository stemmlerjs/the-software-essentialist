

export const appConfig = {
  apiURL: import.meta.env.VITE_API_URL,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  }
} as const;

export type AppConfig = typeof appConfig;
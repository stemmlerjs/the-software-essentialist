import { configure } from "mobx";

// Mock Vite's import.meta.env
Object.defineProperty(window, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:3000',
        MODE: 'test',
        DEV: true,
        PROD: false,
        // Add any other env variables you need
      }
    }
  }
});

// Add any other global test setup here

configure({ enforceActions: "never" })
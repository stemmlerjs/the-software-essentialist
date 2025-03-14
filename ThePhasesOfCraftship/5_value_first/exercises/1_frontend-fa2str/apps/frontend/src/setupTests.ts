// import '@testing-library/jest-dom'; 

// Mock localStorage
// const localStorageMock = {
//   getItem: jest.fn<string | null, [string]>(),
//   setItem: jest.fn<void, [string, string]>(),
//   removeItem: jest.fn<void, [string]>(),
//   clear: jest.fn<void, []>(),
// };

// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock
// });

// // Mock sessionStorage if needed
// const sessionStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
// };

// Object.defineProperty(window, 'sessionStorage', {
//   value: sessionStorageMock
// }); 

// import { spawnSync } from 'child_process';

// // Build the shared packages needed by your frontend
// beforeAll(() => {
//   spawnSync('npx', [
//     'turbo',
//     'run',
//     'build',
//     '--filter=@dddforum/core',
//     '--filter=@dddforum/api',
//     '--filter=@dddforum/errors'
//     // Add more filters here if needed
//   ], { stdio: 'inherit' });
// }); 
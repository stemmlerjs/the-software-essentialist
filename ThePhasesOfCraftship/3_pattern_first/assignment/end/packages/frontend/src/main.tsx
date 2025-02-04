import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.js'
import './index.css'
import { createAPIClient } from '@dddforum/shared/src/api/index.js';

const api = createAPIClient('http://localhost:3000');


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.js'
import './index.css'
import { createAPIClient } from '@dddforum/shared/src/api/index.js';
import { ProductionUsersRepository } from './modules/users/repos/productionUsersRepo.js';
import { PostsPresenter } from './modules/posts/application/postsPresenter.js';
import { FakePostsRepository } from './modules/posts/repos/fakePostsRepository.js';
import { fakePostsData } from './modules/posts/__tests__/fakePostsData.js';

const apiClient = createAPIClient('http://localhost:3000');
const postsRepository = new FakePostsRepository(fakePostsData);
const usersRepository = new ProductionUsersRepository(apiClient);
const postsPresenter = new PostsPresenter(postsRepository, usersRepository);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export {
  apiClient,
  postsRepository,
  usersRepository,
  postsPresenter
}

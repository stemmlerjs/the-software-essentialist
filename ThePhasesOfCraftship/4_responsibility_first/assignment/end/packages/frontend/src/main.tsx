import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.js'
import './index.css'
import { createAPIClient } from '@dddforum/shared/src/api/index.js';
import { PostsPresenter } from './modules/posts/application/postsPresenter.js';
import { FakePostsRepository } from './modules/posts/repos/fakePostsRepository.js';
import { fakePostsData } from './modules/posts/__tests__/fakePostsData.js';
import { FakeUsersRepository } from './modules/users/repos/fakeUsersRepo.js';
import { fakeUserData } from './modules/users/__tests__/fakeUserData.js';
import { NavLoginPresenter } from './modules/users/application/navLoginPresenter.js';
import { ProductionNavigationRepository } from './modules/navigation/repos/productionNavigationRepository.js';
import { RegistrationPresenter } from './modules/users/application/registrationPresenter.js';
import { ToastService } from './shared/services/toastService.js';
import { MarketingService } from './shared/services/marketingService.js';

const apiClient = createAPIClient('http://localhost:3000');
const postsRepository = new FakePostsRepository(fakePostsData);
const usersRepository = new FakeUsersRepository(fakeUserData);
const navigationRepository = new ProductionNavigationRepository();
const postsPresenter = new PostsPresenter(postsRepository, usersRepository);
const navLoginPresenter = new NavLoginPresenter(usersRepository, navigationRepository);
const toastService = new ToastService();
const marketingService = new MarketingService();
const registrationPresenter = new RegistrationPresenter(toastService, usersRepository, marketingService, navigationRepository);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export {
  apiClient,
  
  // Repositories
  postsRepository,
  usersRepository,
  navigationRepository,

  // Presenters
  postsPresenter,
  navLoginPresenter,
  registrationPresenter,

  // Services
  marketingService,
  toastService
}

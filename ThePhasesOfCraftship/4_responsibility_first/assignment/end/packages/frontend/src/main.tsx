import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css'
import { createAPIClient } from '@dddforum/shared/src/api';
import { PostsPresenter } from './modules/posts/application/postsPresenter';
import { FakePostsRepository } from './modules/posts/repos/fakePostsRepository';
import { fakePostsData } from './modules/posts/__tests__/fakePostsData';
// import { FakeUsersRepository } from './modules/users/repos/fakeUsersRepo';
// import { fakeUserData } from './modules/users/__tests__/fakeUserData';
import { NavLoginPresenter } from './modules/users/application/navLoginPresenter';
import { RegistrationPresenter } from './modules/users/application/registrationPresenter';
import { ToastService } from './shared/services/toastService';
import { MarketingService } from './shared/services/marketingService';
import { ProductionUsersRepository } from './modules/users/repos/productionUsersRepo';
import { LocalStorage } from './shared/storage/localStorage';
import { FirebaseService } from './modules/users/externalServices/firebaseService';
import { NavigationService } from './shared/navigation/navigationService';
import { AuthStore } from './shared/auth/authStore';

const apiClient = createAPIClient('http://localhost:3000');
const postsRepository = new FakePostsRepository(fakePostsData);
const localStorage = new LocalStorage();
const firebaseService = new FirebaseService();
const usersRepository = new ProductionUsersRepository(apiClient, localStorage, firebaseService);
const navigationService = new NavigationService();
const postsPresenter = new PostsPresenter(postsRepository, usersRepository);
const navLoginPresenter = new NavLoginPresenter(usersRepository, navigationService);
const toastService = new ToastService();
const marketingService = new MarketingService();
const registrationPresenter = new RegistrationPresenter(usersRepository, navigationService, firebaseService);

// Initialize stores
const authStore = new AuthStore(usersRepository, firebaseService);

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
  

  // Presenters
  postsPresenter,
  navLoginPresenter,
  registrationPresenter,

  // Services
  marketingService,
  toastService,
  navigationService,
  firebaseService,
  authStore,
}

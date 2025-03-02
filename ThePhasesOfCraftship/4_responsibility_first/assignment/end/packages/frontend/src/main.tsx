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

import { RegistrationPresenter } from './modules/users/application/registrationPresenter';
import { ToastService } from './shared/services/toastService';
import { MarketingService } from './shared/services/marketingService';
import { ProductionUsersRepository } from './modules/users/repos/productionUsersRepo';
import { LocalStorage } from './shared/storage/localStorage';
import { FirebaseService } from './modules/users/externalServices/firebaseService';
import { NavigationService } from './shared/navigation/navigationService';
import { AuthRepository } from './modules/users/repos/authRepository';
import { OnboardingPresenter } from './modules/users/application/onboardingPresenter';

import { RootStore } from './stores/root/RootStore';
import { AuthStore } from './stores/auth/authStore';
import { ProductionMembersRepo } from './stores/members/productionMembersRepo';
import { configure } from "mobx"
import { NavLoginPresenter } from './modules/layout/navLoginPresenter';
import { MembersStore } from './stores/members/membersStore';

configure({
    enforceActions: "never",
})

const apiClient = createAPIClient('http://localhost:3000');

const localStorage = new LocalStorage();
const firebaseService = new FirebaseService();
const authRepository = new AuthRepository(apiClient, localStorage, firebaseService);
const usersRepository = new ProductionUsersRepository(apiClient, localStorage, firebaseService);

const membersStore = new MembersStore(

)

const postsRepository = new FakePostsRepository(fakePostsData);
const navigationService = new NavigationService();
const postsPresenter = new PostsPresenter(postsRepository, usersRepository);
const navLoginPresenter = new NavLoginPresenter(usersRepository, membersStore);
const toastService = new ToastService();
const marketingService = new MarketingService();
const registrationPresenter = new RegistrationPresenter(usersRepository, navigationService, firebaseService);
const onboardingPresenter = new OnboardingPresenter(
  membersStore,
  navigationService,
  firebaseService
);

const rootStore = new RootStore(
  authRepository,
  membersStore
);

const authStore = new AuthStore(
  usersRepository,
  firebaseService
)



// Initialize stores
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


export {
  apiClient,

  // Global cross-cutting stores
  rootStore,
  authStore,
  membersStore,
  
  // Repositories
  postsRepository,
  usersRepository,
  authRepository,
  

  // Presenters
  postsPresenter,
  navLoginPresenter,
  registrationPresenter,
  onboardingPresenter,

  // Services
  marketingService,
  toastService,
  navigationService,
  firebaseService,
}


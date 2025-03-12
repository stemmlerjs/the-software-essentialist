import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css'
import { createAPIClient } from '@dddforum/api';
import { PostsPresenter } from './modules/posts/application/postsPresenter';
import { FakePostsRepository } from './modules/posts/repos/fakePostsRepository';
import { fakePostsData } from './modules/posts/__tests__/fakePostsData';
// import { FakeUsersRepository } from './modules/users/repos/fakeUsersRepo';
// import { fakeUserData } from './modules/users/__tests__/fakeUserData';

import { ToastService } from './shared/services/toastService';
import { MarketingService } from './shared/services/marketingService';
import { LocalStorage } from './shared/storage/localStorage';
import { FirebaseService } from './modules/users/externalServices/firebaseService';
import { NavigationService } from './shared/navigation/navigationService';
import { AuthRepository } from './modules/users/repos/authRepository';
import { OnboardingPresenter } from './modules/onboarding/onboardingPresenter';

import { configure } from "mobx"
import { LayoutPresenter } from './modules/layout/layoutPresenter';
import { RegistrationPresenter } from './modules/registration/registrationPresenter';
import { Presenters } from './shared/contexts/presenters';
import { MembersStore } from './shared/stores/members/membersStore';
import { AuthStore } from './shared/stores/auth/authStore';
import { RootStore } from './shared/stores/root/rootStore';
import { SubmissionPresenter } from './modules/submission/application/submissionPresenter';
import { ProductionPostsRepository } from './modules/posts/repos/productionPostsRepository';

configure({ enforceActions: "never" })

const apiClient = createAPIClient('http://localhost:3000');

const localStorage = new LocalStorage();
const firebaseService = new FirebaseService();
const authRepository = new AuthRepository(localStorage, 
  firebaseService
);

const membersStore = new MembersStore();
const authStore = new AuthStore(
  authRepository,
  firebaseService
)

const navigationService = new NavigationService();

const onboardingPresenter = new OnboardingPresenter(
  membersStore,
  navigationService,
  firebaseService
);

const postsRepository = new ProductionPostsRepository(apiClient, authRepository);
const postsPresenter = new PostsPresenter(postsRepository, authRepository);

const registrationPresenter = new RegistrationPresenter(authRepository, navigationService, firebaseService);

const submissionPresenter = new SubmissionPresenter(
  authRepository,
  navigationService,
  postsRepository,
  membersStore
);

const presenters = new Presenters(
  onboardingPresenter, 
  registrationPresenter, 
  postsPresenter,
  submissionPresenter
);

const navLoginPresenter = new LayoutPresenter(authRepository, membersStore);
const toastService = new ToastService();
const marketingService = new MarketingService();


// TODO: clean as repos/stores are the same thing
const rootStore = new RootStore(
  authRepository,
  membersStore
);

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
  presenters,
  
  // Repositories
  postsRepository,
  authRepository,
  

  // Presenters
  postsPresenter,
  navLoginPresenter,
  registrationPresenter,
  onboardingPresenter,
  submissionPresenter,

  // Services
  marketingService,
  toastService,
  navigationService,
  firebaseService,
}


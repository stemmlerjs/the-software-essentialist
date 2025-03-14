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

import { configure } from "mobx"
import { Presenters } from './shared/presenters/presenters';
import { PostsStore } from './modules/posts/repos/postsStore';
import { appConfig } from '@/config';
import { OnboardingPresenter } from './pages/onboarding/onboardingPresenter';
import { RegistrationPresenter } from './pages/join/registrationPresenter';
import { LayoutPresenter } from './shared/layout/layoutPresenter';
import { AuthStore } from './services/auth/auth/authStore';
import { NavigationService } from './modules/navigation/navigationService';
import { SubmissionPresenter } from './pages/submission/application/submissionPresenter';
import { ToastService } from './services/toast/toastService';
import { MarketingService } from './services/marketing/marketingService';
import { Stores } from './shared/store/stores';
import { MembersStore } from './modules/members/membersStore';
import { FirebaseAPI } from './modules/members/firebaseAPI';
import { LocalStorageAPI } from './shared/storage/localStorageAPI';

configure({ enforceActions: "never" })

const apiClient = createAPIClient('http://localhost:3000');

const toastService = new ToastService();
const marketingService = new MarketingService();
const navigationService = new NavigationService();

const localStorageAPI = new LocalStorageAPI();
const firebaseAPI = new FirebaseAPI(appConfig.firebase);

// Make stores
const authStore = new AuthStore(
  apiClient,
  firebaseAPI,
  localStorageAPI
)

const postsStore = new PostsStore(apiClient, authStore);
const stores = new Stores(
  authStore,
  postsStore
);

// Make presenters
const onboardingPresenter = new OnboardingPresenter(
  navigationService,
  authStore
);
const postsPresenter = new PostsPresenter(postsStore, authStore);
const registrationPresenter = new RegistrationPresenter(
  navigationService, 
  authStore
);
const submissionPresenter = new SubmissionPresenter(
  authStore,
  navigationService,
  postsStore
);

const layoutPresenter = new LayoutPresenter(authStore);
const presenters = new Presenters(
  onboardingPresenter, 
  registrationPresenter, 
  postsPresenter,
  submissionPresenter,
  layoutPresenter
);

// Initialize app
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


export {
  apiClient,
  
  toastService,

  marketingService,
  navigationService,

  // Bundle it all up and export
  stores,
  presenters,
}


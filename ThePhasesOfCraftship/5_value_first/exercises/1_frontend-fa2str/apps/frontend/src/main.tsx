import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css'
import { createAPIClient } from '@dddforum/api';
import { PostsPresenter } from './modules/posts/application/postsPresenter';
import { configure } from "mobx"
import { Presenters } from './shared/presenters/presenters';
import { PostsStore } from './modules/posts/repos/postsStore';
import { appConfig } from '@/config';
import { OnboardingPresenter } from './pages/onboarding/onboardingPresenter';
import { RegistrationPresenter } from './pages/join/registrationPresenter';
import { LayoutPresenter } from './shared/layout/layoutPresenter';
import { AuthStore } from './services/auth/authStore';
import { SubmissionPresenter } from './pages/submission/application/submissionPresenter';
import { ToastService } from './services/toast/toastService';
import { MarketingService } from './services/marketing/marketingService';
import { Stores } from './shared/store/stores';

import { FirebaseAPIClient } from './modules/members/firebaseAPI';
import { NavigationStore } from './services/navigation/navigationStore';

configure({ enforceActions: "never" })

const apiClient = createAPIClient('http://localhost:3000');

const toastService = new ToastService();
const marketingService = new MarketingService();

const firebaseAPI = new FirebaseAPIClient(appConfig.firebase);

// Make stores
const authStore = new AuthStore(
  apiClient,
  firebaseAPI
);

const postsStore = new PostsStore(apiClient, authStore);
const navigationStore = new NavigationStore();
const stores = new Stores(
  authStore,
  postsStore,
  navigationStore
);

// Make presenters
const onboardingPresenter = new OnboardingPresenter(
  navigationStore,
  authStore,
  marketingService
);
const postsPresenter = new PostsPresenter(postsStore, authStore);
const registrationPresenter = new RegistrationPresenter(
  navigationStore, 
  authStore
);
const submissionPresenter = new SubmissionPresenter(
  authStore,
  navigationStore,
  postsStore
);

const layoutPresenter = new LayoutPresenter(authStore, navigationStore);

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

  // Bundle it all up and export
  stores,
  presenters,
}


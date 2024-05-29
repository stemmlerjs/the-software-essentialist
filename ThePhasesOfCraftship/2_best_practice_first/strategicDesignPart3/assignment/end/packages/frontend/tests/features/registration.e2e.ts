
import { defineFeature, loadFeature } from 'jest-cucumber';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import * as path from 'path';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then }) => {
    
    given('I am a new user', async () => {
      // to be implemented
    });

    when('I register with valid account details', async () => {
      // to be implemented
    });

    then('I should be granted access to my account', async () => {
      // to be implemented
    });
  });
});

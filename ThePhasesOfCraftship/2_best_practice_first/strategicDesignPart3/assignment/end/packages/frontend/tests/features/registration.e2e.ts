
import { defineFeature, loadFeature } from 'jest-cucumber';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import * as path from 'path';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

defineFeature(feature, (test) => {
  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    
    given('I am a new user', async () => {
      // to be implemented
    });

    when('I register with valid account details accepting marketing emails', async () => {
      // to be implemented
    });

    then('I should be granted access to my account', async () => {
      // to be implemented
    });

    and('I should expect to receive marketing emails', async () => {
      // to be implemented
    })
  });
});

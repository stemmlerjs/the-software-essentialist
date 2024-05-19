
import { defineFeature, loadFeature } from 'jest-cucumber';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import path from 'path';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

defineFeature(feature, (test) => {
  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    
    given('I am a new user', async () => {

    });

    when('I register with valid account details accepting marketing emails', async () => {

    });

    then('I should be granted access to my account', async () => {
     
    });

    and('I should expect to receive marketing emails', () => {

    });
  });
});

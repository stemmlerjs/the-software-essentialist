import * as path from "path";
import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature(
  path.join(__dirname, "./postComment.feature"),
);

defineFeature(feature, (test) => {
  test('Posting the first comment on a post', ({ given, when, then, and }) => {
    given('I am a member who wants to post the first comment on a post', () => {

    });

    when('I post the comment', () => {

    });

    then('I should see the comment exists', () => {

    });

    and('the author of the post should be notified that the comment was posted', () => {
      
    });
  });
});

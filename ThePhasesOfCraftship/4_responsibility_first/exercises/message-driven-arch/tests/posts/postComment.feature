Feature: Posting a comment

  As a member, I want to post a comment on a post to engage in conversation

  Scenario: Posting the first comment on a post

    Given I am a member who wants to post the first comment on a post 
    When I post the comment 
    Then I should see the comment exists
    And the author of the post should be notified that the comment was posted
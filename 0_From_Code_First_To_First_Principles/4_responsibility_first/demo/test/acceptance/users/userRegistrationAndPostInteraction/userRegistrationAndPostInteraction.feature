
Feature: User Registration and Post Interaction
  As a user
  I want to register an account, submit my first post, receive upvotes and comments,
  and get achievement and notification emails

  Scenario: User registers an account, submits first post, and receives upvotes and comments
    Given there is at least one existing member 
    When I register as a member
    And I submit my first post
    Then my post should be initially upvoted by me
    And another member leaves a comment on my post
    And another member upvotes my post
    Then I should receive a FirstUpvoteAchievement email
    And I should receive a notification email about the comment on my post
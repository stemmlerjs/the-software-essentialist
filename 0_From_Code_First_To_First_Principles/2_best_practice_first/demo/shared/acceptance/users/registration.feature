Feature: Registration
  As a user
  I want to register an account
  So that I can join the community discussions

  Scenario: Successful registration
    Given I am a new user
    When I register with valid account details
    Then I should be granted access to my account
    And I should receive an email with login instructions
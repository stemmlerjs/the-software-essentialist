Feature: Registration
	As a new user
	I want to be able to register as a Member
  So that I can vote on posts, ask questions, & earn points for discounts 
	on merch & tickets

	# Success scenario
	@backend @frontend
	Scenario: Successful registration with marketing emails accepted
		Given I am a new user
    When I register with valid account details accepting marketing emails
    Then I should be granted access to my account
    And I should expect to receive marketing emails

	@backend @frontend
	Scenario: Successful registration without marketing emails accepted
		Given I am a new user
    When I register with valid account details declining marketing emails
    Then I should be granted access to my account
    And I should not expect to receive marketing emails
	
	# Failure scenarios
	@backend @frontend
	Scenario: Invalid or missing registration details
		Given I am a new user
		When I register with invalid account details
		Then I should see an error notifying me that my input is invalid
		And I should not have been sent access to account details

	@backend
	Scenario: Account already created w/ email
		Given a user already created an account @ 'john123@example.com'
		When I register with valid account details
		Then I should see an error notifying me this account already exists
		And I should not have been sent access to account details

	@backend
	Scenario: Username already taken
		Given a user already created an account with the 'user123' username
		When I register with valid account details
		Then I should see an error notifying me this account already exists
		And I should not have been sent access to account details

Feature: Registration
	As a new user
	I want to be able to register as a Member
  So that I can vote on posts, ask questions, & earn points for discounts 
	on merch & tickets

	# Success scenario
	Scenario: Successful registration with marketing emails accepted
		Given I am a new user
    When I register with valid account details
		And I have accepted marketing emails
    Then I should be granted access to my account
    And I should expect to receive marketing emails

	# Scenario: Successful registration without marketing emails accepted
	# 	Given I am a new user
  #   When I register with valid account details
	# 	And I have not accepted marketing emails
  #   Then I should be granted access to my account
  #   And I should not receive any marketing emails
	
	# Failure scenarios
	# Scenario: Invalid or missing registration details
	# Scenario: Account already created w/ email
	# Scenario: Username already taken
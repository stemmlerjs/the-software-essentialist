Feature: Retrieve a specific student

    As an administrator
    I want to retrieve a student
    So that I can view details of a specific student

    Scenario: Successfully retrieving a student
        Given I have a valid student
        When I request the student
        Then I should receive the student's details

    Scenario: Attempt to retrieve a non-existent student
        When I request the student
        Then I should receive an error

    Scenario: Attempt to retrieve an invalid student
        When I request an invalid student
        Then I should receive an error

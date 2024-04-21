Feature: Retrieve a specific student by ID

    As an administrator
    I want to retrieve a student by their ID
    So that I can view details of a specific student

    Scenario: Successfully retrieving a student by ID
        Given I have a student with a valid ID
        When I request the student by this ID
        Then I should receive the student's details

    Scenario: Attempt to retrieve a student with a non-existent ID
        When I request the student with non existent ID
        Then I should receive a 404 not found error

    Scenario: Attempt to retrieve a student with an invalid ID format
        When I request a student with an invalid ID
        Then I should receive a 400 bad request error

Feature: Retrieve a specific assignment

    As a teacher
    I want to retrieve an assignment
    So that I can view details of a specific assignment

    Scenario: Successfully retrieving an assignment
        Given I have a valid assignment
        When I request the assignment
        Then I should receive the assignment's details

    Scenario: Attempt to retrieve a non-existent assignment
        When I request the assignment
        Then I should receive an error

    Scenario: Attempt to retrieve an invalid assignment
        When I request an invalid assignment
        Then I should receive an error
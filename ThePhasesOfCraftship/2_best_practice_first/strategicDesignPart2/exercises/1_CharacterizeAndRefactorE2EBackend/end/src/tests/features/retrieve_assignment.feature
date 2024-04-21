Feature: Retrieve a specific assignment by ID

    As a teacher
    I want to retrieve an assignment by its ID
    So that I can view details of a specific assignment

    Scenario: Successfully retrieving an assignment by ID
        Given I have an assignment with a valid ID
        When I request the assignment by this ID
        Then I should receive the assignment's details

    Scenario: Attempt to retrieve an assignment with a non-existent ID
        When I request the assignment with non-existent ID
        Then I should receive a 404 not found error

    Scenario: Attempt to retrieve an assignment with an invalid ID format
        When I request an assignment with an invalid ID
        Then I should receive a 400 bad request error

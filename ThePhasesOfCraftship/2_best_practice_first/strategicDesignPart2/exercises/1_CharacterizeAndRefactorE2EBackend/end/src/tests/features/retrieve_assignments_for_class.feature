Feature: Retrieve assignments for a class by ID

    As a teacher
    I want to retrieve all assignments for a specific class
    So that I can choose one to assign to my students

    Scenario: Successfully retrieving assignments for a class by ID
        Given I have a class with assignments
        When I request all assignments for this class by ID
        Then I should receive a list of all assignments for that class

    Scenario: Attempt to retrieve assignments for a class with a non-existent ID
        When I request assignments for a class with non-existent ID
        Then I should receive a 404 not found error

    Scenario: Attempt to retrieve assignments for a class with an invalid ID format
        When I request assignments for a class with an invalid ID
        Then I should receive a 400 bad request error

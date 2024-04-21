Feature: Retrieve submitted assignments for a student by ID

    As a teacher
    I want to retrieve all submitted assignments for a specific student
    So that I can view grade each assignment

    Scenario: Successfully retrieving submitted assignments for a student by ID
        Given I have a student with submitted assignments
        When I request all submitted assignments for this student by ID
        Then I should receive a list of all submitted assignments for that student

    Scenario: Attempt to retrieve submitted assignments for a student with a non-existent ID
        When I request submitted assignments for a student with non-existent ID
        Then I should receive a 404 not found error

    Scenario: Attempt to retrieve submitted assignments for a student with an invalid ID format
        When I request submitted assignments for a student with an invalid ID
        Then I should receive a 400 bad request error

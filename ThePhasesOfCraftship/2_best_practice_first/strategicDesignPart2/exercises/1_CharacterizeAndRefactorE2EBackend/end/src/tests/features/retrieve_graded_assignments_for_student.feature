Feature: Retrieve graded assignments for a student by ID

    As a teacher
    I want to retrieve all graded assignments for a specific student
    So that I can see their progress

    Scenario: Successfully retrieving graded assignments for a student by ID
        Given I have a student with graded assignments
        When I request all graded assignments for this student by ID
        Then I should receive a list of all graded assignments for that student

    Scenario: Attempt to retrieve graded assignments for a student with a non-existent ID
        When I request graded assignments for a student with a non-existent ID
        Then I should receive a 404 not found error

    Scenario: Attempt to retrieve graded assignments for a student with an invalid ID format
        When I request graded assignments for a student with an invalid ID
        Then I should receive a 400 bad request error

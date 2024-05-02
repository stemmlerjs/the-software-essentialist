Feature: Retrieve submitted assignments for a student

    As a teacher
    I want to retrieve all submitted assignments for a specific student
    So that I can view grade each assignment

    Scenario: Successfully retrieving submitted assignments for a student
        Given I have a student with submitted assignments
        When I request all submitted assignments for this student
        Then I should receive all submitted assignments for that student

    Scenario: Attempt to retrieve submitted assignments for a non-existent student
        When I request submitted assignments for a non-existent student
        Then I should receive an error

    Scenario: Attempt to retrieve submitted assignments for an invalid student
        When I request submitted assignments for an invalid student
        Then I should receive an error

Feature: Retrieve graded assignments for a student

    As a teacher
    I want to retrieve all graded assignments for a specific student
    So that I can see their progress

    Scenario: Successfully retrieving graded assignments for a student
        Given I have a student with graded assignments
        When I request all graded assignments for this student
        Then I should receive all graded assignments for that student

    Scenario: Attempt to retrieve graded assignments for a non-existent student
        When I request graded assignments for a non-existent student
        Then I should receive an error

    Scenario: Attempt to retrieve graded assignments for an invalid student 
        When I request graded assignments for an invalid student
        Then I should receive an error

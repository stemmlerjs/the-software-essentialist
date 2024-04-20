Feature: Grade an assignment

    As a teacher
    I want to grade an assignment
    So that I can give feedback to the student

    Scenario: Successfully grade an assignment
        Given An student submited an assignment
        When I grade the assignment
        Then It should be marked as graded
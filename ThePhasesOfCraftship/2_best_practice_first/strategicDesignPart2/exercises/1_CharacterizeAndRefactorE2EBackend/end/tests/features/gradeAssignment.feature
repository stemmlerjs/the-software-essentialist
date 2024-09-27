Feature: Grade an assignment

    As a teacher
    I want to grade an assignment
    So that I can give feedback to the student

    Scenario: Successfully grade an assignment
        Given An student submited an assignment
        When I grade the assignment
        Then It should be marked as graded

    Scenario: Fail to grade an assignment when it is not submitted
        Given A student hasn't yet submitted his assignment
        When I try to grade his assignment before he submits it
        Then It should not be marked as graded

    Scenario: Should fail to re-grade an already graded assignment
        Given a submitted assignment has already been graded 
        When I try to re-grade the assignment 
        Then it should fail
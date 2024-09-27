Feature: Submit an assignment

    As a student
    I want to submit an assignment
    So that I can get a grade

    Scenario: Successfully submit an assignment
        Given I was assigned an assignment
        When I submit my assignment
        Then it should be successfully submitted

    Scenario: Submitting assignments multiple times
        Given I have already submitted my assignment
        When I submit my assignment again 
        Then I should see an error message
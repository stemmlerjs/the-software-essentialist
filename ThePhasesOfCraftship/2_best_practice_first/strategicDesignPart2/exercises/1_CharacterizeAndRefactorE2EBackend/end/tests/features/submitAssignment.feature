Feature: Submit an assignment

    As a student
    I want to submit an assignment
    So that I can get a grade

    Scenario: Successfully submit an assignment
        Given I was assigned to an assignment
        When I submit the assignment
        Then It should be marked as submitted

    Scenario: Fail to submit an assignment twice
        And I submitted the assignment
        When I submit the assignment again
        Then I should see an error message
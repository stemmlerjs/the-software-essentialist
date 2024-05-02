Feature: Create an assignment

    As a teacher
    I want to create an assignment
    So that I can assign it to students

    Scenario: Successfully create an assignment
        Given I give a class
        When I create an assignment to the class
        Then the assignment should be created successfully


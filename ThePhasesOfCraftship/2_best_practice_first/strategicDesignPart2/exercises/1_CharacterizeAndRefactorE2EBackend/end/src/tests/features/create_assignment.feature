Feature: Create an assignment

    As a teacher
    I want to create an assignment
    So that I can assign it to students

    Scenario: Successfully create an assignment
        Given I give a class named "Math"
        And I want to create an assignment named "Assignment 1"
        When I send a request to create an assignment
        Then the assignment should be created successfully


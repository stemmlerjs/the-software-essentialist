Feature: Create an assignment

    As a teacher
    I want to create an assignment
    So that I can assign it to students

    Scenario: Successfully create an assignment
        Given a class exists
        When I create an assignment for the class
        Then the assignment should be created successfully


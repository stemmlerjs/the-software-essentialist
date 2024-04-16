Feature: Assign a student to an assignment

    As a teacher
    I want to assign a student to an assignment
    So that the student learning can be tracked

    Scenario: Assign a student to an assignment
        Given I give a class named "Math"
        And I create an assignment named "Assignment 1"
        And There is a student enrolled to the class
        When I assign him to the assignment
        Then the student should be assigned to the assignment
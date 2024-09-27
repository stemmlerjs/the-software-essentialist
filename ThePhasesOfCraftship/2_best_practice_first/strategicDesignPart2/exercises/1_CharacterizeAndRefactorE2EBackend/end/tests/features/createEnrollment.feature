Feature: Enroll a student to a class

    As an administrator
    I want to enroll a student to a class
    So that the student can attend the class

    Scenario: Successfully enroll a student to a class
        Given there is a class and a student
        When I enroll the student to the class
        Then the student should be enrolled to the class successfully

    Scenario: Enroll a student to a class that doesn't exist
        Given there is a student
        When I enroll the student to a class that doesn't exist
        Then the student should not be enrolled to the class
    
    Scenario: Already enrolled
        Given a student is already enrolled to a class
        When I enroll the student to the class again
        Then I should see an error message
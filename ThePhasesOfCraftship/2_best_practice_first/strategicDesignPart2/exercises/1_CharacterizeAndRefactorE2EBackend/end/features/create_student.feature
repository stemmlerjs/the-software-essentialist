Feature: Create Student

    As an administrator
    I want to be able to create student records
    So that the students can be assigned to classes and managed within the system


    Scenario: Successful Student Creation
        Given I want to create a student named "Khalil Stemmler"
        When I send a request to create a student
        Then the student should be created successfully

    Scenario: Unsuccessful Student Creation
        Given I want to create a student with a missing name
        When I send a request to create a student
        Then the student should not be created
        And I should receive an error message

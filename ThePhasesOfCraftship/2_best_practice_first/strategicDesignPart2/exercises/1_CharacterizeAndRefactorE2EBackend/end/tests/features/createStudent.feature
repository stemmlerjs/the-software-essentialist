Feature: Create Student

    As an administrator
    I want to be able to create student records
    So that the students can be assigned to classes and managed within the system

    Scenario: Successfuly create a student
        Given I want to create a student named "Khalil Stemmler" and with email "khalil@essentialist.dev"
        When I send a request to create a student
        Then the student should be created successfully

    Scenario: Missing Student Email
        Given I want to create a student named "Khalil Stemmler" and no email
        When I send a request to create a student
        Then the student should not be created
        And I should receive an error message

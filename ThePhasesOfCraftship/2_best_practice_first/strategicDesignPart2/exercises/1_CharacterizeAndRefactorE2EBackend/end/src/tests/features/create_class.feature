Feature: Create Class

    As an administrator
    I want to create a class
    So that I can add students to it

    Scenario: Sucessfully create a class
        Given I want to create a class named "Math"
        When I send a request to create a class
        Then the class should be created successfully

    Scenario: Fail to create a class
        Given I want to create a class no name
        When I send a request to create a class
        Then the class should not be created
Feature: Create Class Room

    As an administrator
    I want to create a class
    So that I can add students to it

    Scenario: Sucessfully create a class room
        Given I want to create a class room named "Math"
        When I send a request to create a class room
        Then the class room should be created successfully

    Scenario: Fail to create a class room
        Given I want to create a class room with no name
        When I send a request to create a class room
        Then the class room should not be created

    Scenario: Classroom already exists
        Given I want to create a class room that already exists
        When I send a request to create a class room
        Then the class room should not be created
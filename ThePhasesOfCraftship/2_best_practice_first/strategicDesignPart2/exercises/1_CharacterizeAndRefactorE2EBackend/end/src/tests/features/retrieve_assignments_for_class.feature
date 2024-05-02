Feature: Retrieve assignments for a class room

    As a teacher
    I want to retrieve all assignments for a specific class room
    So that I can choose one to assign to my students

    Scenario: Successfully retrieving assignments for a class room
        Given I have a class room with assignments
        When I request all assignments for this class room
        Then I should receive all assignments for that class room

    Scenario: Attempt to retrieve assignments for a non-existent class room
        When I request assignments for a non-existent class room
        Then I should receive an error

    Scenario: Attempt to retrieve assignments for an invalid class room
        When I request assignments for an invalid class room
        Then I should receive a 400 bad request error

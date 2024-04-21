Feature: Retrieve all students

    As an administrator
    I want to retrieve all students
    So that I can see a list of all registered students

    Scenario: Successfully retrieving all students
        Given there are students registered
        When I request all students
        Then I should receive a list of all students


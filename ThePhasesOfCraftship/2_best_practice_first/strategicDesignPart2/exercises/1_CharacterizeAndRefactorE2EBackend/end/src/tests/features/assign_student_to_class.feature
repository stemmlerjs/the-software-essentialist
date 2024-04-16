Feature: Assign a student to a class

    As an administrator
    I want to assign a student to a class
    So that the student can attend the class

    Scenario: Successfully assign a student to a class
        Given there is a student with the data below
            | Name            | Email                   |
            | Khalil Stemmler | khalil@essentialist.dev |
        And there is a "Math" class
        When I request to assign the student to the class
        Then the student should be assigned to the class successfully
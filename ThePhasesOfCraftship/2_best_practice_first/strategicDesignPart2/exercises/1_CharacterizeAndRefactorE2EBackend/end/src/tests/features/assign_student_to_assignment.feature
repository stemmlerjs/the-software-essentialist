Feature: Assign a student to an assignment

    As a teacher
    I want to assign a student to an assignment
    So that the student learning can be tracked

    Scenario: Assign a student to an assignment
        Given There is a student enrolled to my class
        When I assign him to the assignment
        Then the student should be assigned to the assignment

    Scenario: Fail to assign a student to an assignment when the student is not enrolled to the class
        Given A student is not enrolled to my class
        When I assign him to the assignment
        Then the student should not be assigned to the assignment
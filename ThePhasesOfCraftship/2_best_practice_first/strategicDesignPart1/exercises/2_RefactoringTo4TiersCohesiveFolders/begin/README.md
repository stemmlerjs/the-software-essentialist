# Begin


## Context

A client asked me to build a system for a high school domain.
Students are assigned to classes, get graded and get report cards.

In this system, an admin has the ability up the entirety of the school 
system involving classes, assignments, students, and so on and so forth. 
Teachers grade assignments.

In a meeting with the client, he mentioned his business goals and we identified 
the features that would meet those goals.

A software is the result of the interpretation that developers have of the client's needs, 
so we need an approach that minimizes the risks of failure in understanding.

Under my guidance, as a professional, we identified the use cases by documenting the user stories 
and grouping them by role.

The output of our conversation was the following user stories:

As an administrator 

- I want to create a student so that they can be assigned to classes (student management)
- I want to create a class so that students can be assigned to this class (class management)
- I want to assign a student to a class (student / class management)
- I want to view all students in order to verify whether there's any missing one or select one to see details
- I want to view a student in order to verify his informations and academic history
- I want to edit student details so that I can correct errors or update information as needed (student management).
- I want to remove a student from a class so that I can manage changes in class enrollment (student / class management).
- I want to view all classes so that I can oversee and manage the class structure effectively (class management).
- I want to generate reports on class enrollment so that I can analyze and respond to trends in student participation (report management).
- I want to edit class details so that I can update information like schedule, syllabus, or teacher assignments as necessary (class management).
- I want to remove a class so that I can manage the course offerings each semester or year (class management).
- I want to deactivate or reactivate a student account so that I can manage student access based on enrollment status (student management).
- I want to create user accounts for teachers so that they can access and manage their classes and assignments (user account management).
- I want to remove a teacher from a class so that I can manage staffing changes and reassignments (class management).
- I want to view teacher activities and class assignments to ensure quality education standards and compliance (monitoring and compliance management).

As a teacher 

- I want to create assignments so that I can assess students on their learning (assignments management)
- I want to assign an assignment to the students so that they can do it (assignments management)
- I want to grade an assignment submitted by a student so that they can see their performance (assignments management)
- I want to view all students in my class so that I can understand who I am teaching
- I want to send announcements to a class so that I can communicate important information efficiently (communication management).
- I want to view the submission status of assignments so that I can track completion and follow up with students accordingly (assignments management).
- I want to update or delete an assignment so that I can make corrections or adjustments as the course progresses (assignments management).
- I want to view a student grades in order to keep track of his learning development
- I want to edit student grades so that I can update them as needed after reviews or appeals
- I want to remove students from my course if they withdraw or are transferred from the class
- I want to create resources for a class such as lecture notes and study guides so that I can enhance student learning
- I want to modify the class schedule to update session timings or reschedule classes as needed
- I want to remove old announcements to keep the class information relevant and up-to-date   

As a student

- I want to view my assignments in order to do them
- I want to submit my assignments in order to be assessed by the teacher
- I want to view my grades in order to keep track of my academic performance
- I want to communicate with my teacher so that I can ask questions and get clarifications on assignments
- I want to see feedback on my assignments so that I can learn from my mistakes and improve
- I want to edit my personal information such as contact details and password so that I can keep my account secure and updated
- I want to remove a submitted assignment if I discover I have uploaded the wrong file before the deadline
- I want to create a study group so that I can collaborate with classmates on assignments and projects
- I want to sign up for elective classes so that I can fulfill my curriculum requirements and explore my interests
- I want to view my submission status in order to see if they where graded

As a Parent

- I want to view my child’s grades so that I can monitor their academic progress (academic management).
- I want to receive notifications about my child’s assignments and grades so that I can stay informed about their academic activities (communication management).
- I want to communicate with teachers so that I can discuss my child’s academic performance and needs (communication management).


Have you noticed how much more complex it appears compared to our initial understanding? This is a common occurrence in real life. 
As we delve deeper with questions for the client, we often discover that the system's requirements are far more extensive than 
even the client initially realized.

Naturally, we won't develop all the features simultaneously, nor will we include all of them in the initial release. There are several compelling reasons for this approach:

- Prioritization: By focusing on the most critical functionalities first, we ensure that essential features are developed and tested thoroughly.
- Resource Management: This method helps in allocating resources efficiently, avoiding over-extension of our team and budget.
- Feedback Incorporation: Launching with a core set of features allows us to gather user feedback early on, which can inform the development of additional features and improvements in subsequent releases.
- Risk Mitigation: Introducing features gradually helps in identifying and addressing any issues or bugs early, reducing the risk of major problems after a full-scale launch.

We will collaborate with our client to identify the core features that are essential for providing initial value to users. 
This prioritization process is known as feature injection. We will select the most critical features for the upcoming iteration, 
ensuring they are closely aligned with the client's business goals. 
This targeted approach helps guarantee that each release strategically enhances user experience and meets key objectives.


Based on this prioritization, we have selected the following use cases:


As an administrator

- I want to create a student so that they can be assigned to classes
- I want to create a class so that students can be assigned to this class
- I want to assign a student to a class
- I want to view a student in order to verify his informations and academic history
- I want to view all students in order to verify whether there's any missing one or select one to see details


As a teacher

- I want to create assignments so that I can assess students on their learning
- I want to assign an assignment to the students so that they can do it
- I want to grade an assignment submitted by a student so that they can see their performance
- I want to view all students in my class so that I can understand who I am teaching
- I want to view a student grades in order to keep track of his learning development

As a student
- I want to submit my assignments in order to be assessed by the teacher
- I want to view my assignments in order to do them
- I want to view my grades in order to keep track of my academic performance
- I want to view my submission status in order to see if they where graded


Our list of requirements for the first release is much simpler, allowing us to iterate rapidly and gather feedback earlier.

Now it's your turn. Based on the user stories provided, how would you elaborate the roles-goals-capabilities-grouping and unsafely refactor the code to separate the concerns into different layers?
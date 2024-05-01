import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

class StudentBuilder {
  private student: any;
  private assignments: any[];

  constructor() {
    this.student = null;
    this.assignments = [];
  }

  async build() {
    this.student = await prisma.student.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    return this.student;
  }

  async assignAssignments(assignments: any[]) {
    this.assignments = await Promise.all(
      assignments.map((assignment) => {
        return prisma.studentAssignment.create({
          data: {
            studentId: this.student.id,
            assignmentId: assignment.id,
          },
        });
      })
    );

    return this.assignments;
  }

  getStudent() {
    return this.student;
  }

  getAssignments() {
    return this.assignments;
  }
}

export { StudentBuilder };

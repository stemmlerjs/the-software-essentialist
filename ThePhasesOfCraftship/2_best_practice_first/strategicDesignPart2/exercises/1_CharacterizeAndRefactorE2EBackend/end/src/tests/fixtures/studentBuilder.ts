import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

interface StudentAssignment {
  studentId: string;
  assignmentId: string;
  grade: string | null;
  status: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

class StudentBuilder {
  private student: Student;
  private assignments: StudentAssignment[];

  constructor() {
    this.student = {
      id: "",
      name: "",
      email: "",
    };
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

  async submitAssignments(assignments: any[]) {
    this.assignments = await Promise.all(
      assignments.map((assignment) => {
        return prisma.studentAssignment.create({
          data: {
            assignmentId: assignment.id,
            studentId: this.student.id,
            status: "submitted",
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

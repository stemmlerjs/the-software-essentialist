import { prisma } from "../../database";
import { faker } from "@faker-js/faker";
import { Student, StudentAssignment } from "./types";

class StudentBuilder {
  private student: Student;
  private assignments: StudentAssignment[];

  constructor() {
    this.student = this.emptyStudent();
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

  async assignAssignment(assignmentId: string) {
    const assignment = await prisma.studentAssignment.create({
      data: {
        assignmentId,
        studentId: this.student.id,
      },
    });

    this.assignments.push(assignment);
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

  async submitAssignment(assignmentId: string) {
    return prisma.studentAssignment.update({
      where: {
        studentId_assignmentId: {
          assignmentId,
          studentId: this.student.id,
        },
      },
      data: {
        status: "submitted",
      },
    });
  }

  async gradeAssignments(assignments: any[]) {
    this.assignments = await Promise.all(
      assignments.map((assignment) => {
        return prisma.studentAssignment.create({
          data: {
            assignmentId: assignment.id,
            studentId: this.student.id,
            status: "submitted",
            grade: "A",
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

  emptyStudent(): Student {
    return {
      id: "",
      name: "",
      email: "",
    };
  }
}

export { StudentBuilder };

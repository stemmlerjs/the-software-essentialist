import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { Student } from "./types";
import { ClassRoomBuilder } from "./classRoomBuilder";

class StudentBuilder {
  private student: Partial<Student>;
  private classRoomBuilder: ClassRoomBuilder;

  constructor() {
    this.classRoomBuilder = new ClassRoomBuilder();
    this.student = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
  }

  from (classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    this.classRoomBuilder.withStudent(this);
    return this;
  }

  withRandomDetails () {
    this.student.email = faker.internet.email();
    this.student.name = faker.person.fullName();
    return this;
  }

  async build() {    
    let student = await prisma.student.create({
      data: {
        name: this.student.name as string,
        email: this.student.email as string
      }
    });

    return student;
  }

  // async assignAssignments(assignments: any[]) {
  //   this.assignments = await Promise.all(
  //     assignments.map((assignment) => {
  //       return prisma.studentAssignment.create({
  //         data: {
  //           studentId: this.student.id,
  //           assignmentId: assignment.id,
  //         },
  //       });
  //     })
  //   );

  //   return this.assignments;
  // }

  // async assignAssignment(assignmentId: string) {
  //   const assignment = await prisma.studentAssignment.create({
  //     data: {
  //       assignmentId,
  //       studentId: this.student.id,
  //     },
  //   });

  //   this.assignments.push(assignment);
  //   return this.assignments;
  // }

  // async submitAssignments(assignments: any[]) {
  //   this.assignments = await Promise.all(
  //     assignments.map((assignment) => {
  //       return prisma.studentAssignment.create({
  //         data: {
  //           assignmentId: assignment.id,
  //           studentId: this.student.id,
  //           status: "submitted",
  //         },
  //       });
  //     })
  //   );

  //   return this.assignments;
  // }

  // async submitAssignment(assignmentId: string) {
  //   return prisma.studentAssignment.update({
  //     where: {
  //       studentId_assignmentId: {
  //         assignmentId,
  //         studentId: this.student.id,
  //       },
  //     },
  //     data: {
  //       status: "submitted",
  //     },
  //   });
  // }

  // async gradeAssignments(assignments: any[]) {
  //   this.assignments = await Promise.all(
  //     assignments.map((assignment) => {
  //       return prisma.studentAssignment.create({
  //         data: {
  //           assignmentId: assignment.id,
  //           studentId: this.student.id,
  //           status: "submitted",
  //           grade: "A",
  //         },
  //       });
  //     })
  //   );

  //   return this.assignments;
  // }

  // getStudent() {
  //   return this.student;
  // }

  // getAssignments() {
  //   return this.assignments;
  // }
}

export { StudentBuilder };

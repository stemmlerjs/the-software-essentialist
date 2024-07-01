import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { StudentBuilder } from "./studentBuilder";
import { AssignmentBuilder } from "./assignmentBuilder";
import { ClassRoom, EnrolledStudent } from "./types";

class ClassRoomBuilder {
  private studentsBuilders: StudentBuilder[];
  private assignmentsBuilders: AssignmentBuilder[];

  private classRoom: ClassRoom;
  private enrolledStudents: EnrolledStudent[];

  private shouldAssignAssignments: boolean;
  private shouldSubmitAssignments: boolean;
  private shouldGradeAssignments: boolean;

  constructor() {
    this.studentsBuilders = [];
    this.assignmentsBuilders = [];
    this.classRoom = {
      id: "",
      name: "",
    };
    this.enrolledStudents = [];
    this.shouldAssignAssignments = false;
    this.shouldSubmitAssignments = false;
    this.shouldGradeAssignments = false;
  }

  withStudent(studentBuilder: StudentBuilder) {
    this.studentsBuilders.push(studentBuilder);
    return this;
  }

  withStudents(studentBuilders: StudentBuilder[]) {
    this.studentsBuilders = [...this.studentsBuilders, ...studentBuilders];
    return this;
  }

  withAssignment(assignmentBuilder: AssignmentBuilder) {
    if (this.assignmentsBuilders.length) {
      throw new Error(
        "You must use only one assigment clause. Check if you have used withAssignment(s) or withAssignment(s)AssignedToAllStudents previously"
      );
    }
    this.assignmentsBuilders.push(assignmentBuilder);
    return this;
  }

  withAssignments(assignmentBuilders: AssignmentBuilder[]) {
    if (this.assignmentsBuilders.length) {
      throw new Error(
        "You must use only one assigment clause. Check if you have used withAssignment(s) or withAssignment(s)AssignedToAllStudents previously"
      );
    }
    this.assignmentsBuilders = assignmentBuilders;
    return this;
  }

  withAssignmentAssignmentToAllStudentsThenSubmittedAndGraded(
    assignmentBuilders: AssignmentBuilder[]
  ) {
    if (this.assignmentsBuilders.length) {
      throw new Error(
        "You must use only one assigment clause. Check if you have used withAssignment(s) or withAssignment(s)AssignedToAllStudents previously"
      );
    }
    this.assignmentsBuilders = assignmentBuilders;
    this.shouldGradeAssignments = true;
    return this;
  }

  withAssignmentAssignedToAllStudents(assignmentBuilder: AssignmentBuilder) {
    if (this.assignmentsBuilders.length) {
      throw new Error(
        "You must use only one assigment clause. Check if you have used withAssignment(s) or withAssignment(s)AssignedToAllStudents previously"
      );
    }
    this.assignmentsBuilders.push(assignmentBuilder);
    this.shouldAssignAssignments = true;
    return this;
  }

  withAssignedAssignments() {
    if (this.shouldAssignAssignments) {
      throw new Error(
        "You can't assign assignments to students more than once"
      );
    }
    this.shouldAssignAssignments = true;
    return this;
  }

  withAssignmentsSubmitted () {
    this.shouldSubmitAssignments = true;
    return this;
  }

  withAssignmentsAssignedToAllStudentsThenSubmitted(
    assignmentBuilders: AssignmentBuilder[]
  ) {
    if (this.assignmentsBuilders.length) {
      throw new Error(
        "You must use only one assigment clause. Check if you have used withAssignment(s) or withAssignment(s)AssignedToAllStudents previously"
      );
    }
    this.assignmentsBuilders = assignmentBuilders;
    this.shouldSubmitAssignments = true;
    return this;
  }

  async enrollStudent(studentBuilder: StudentBuilder) {
    if (this.classRoom) {
      const student = await studentBuilder.build();
      await prisma.classEnrollment.create({
        data: {
          classId: this.classRoom.id,
          studentId: student.id,
        },
      });

      return student;
    }

    return studentBuilder.emptyStudent();
  }

  async build() {
    await this.createClass();
    await this.createStudents();
    await this.createAssignments();
    await this.enrollStudents();
    await this.assignAssignments();
    await this.submitAssignments();
    await this.gradeAssignments();

    return {
      classRoom: this.classRoom,
      students: this.studentsBuilders.map((builder) => builder.getStudent()),
      assignments: this.assignmentsBuilders.map((builder) =>
        builder.getAssignment()
      ),
      classEnrollment: this.enrolledStudents,
      studentAssignments: this.studentsBuilders.flatMap((builder) =>
        builder.getAssignments()
      ),
    };
  }

  private async createClass() {
    this.classRoom = await prisma.class.create({
      data: {
        name: faker.lorem.word(),
      },
    });
  }

  private async createStudents() {
    await Promise.all(this.studentsBuilders.map((builder) => builder.build()));
  }

  private async createAssignments() {
    await Promise.all(
      this.assignmentsBuilders.map((builder) =>
        builder.build(this.classRoom.id)
      )
    );
  }

  private async enrollStudents() {
    const students = this.studentsBuilders.map((builder) =>
      builder.getStudent()
    );
    const studentPromises = students.map((student) => {
      return prisma.classEnrollment.create({
        data: {
          classId: this.classRoom.id,
          studentId: student.id,
        },
      });
    });

    this.enrolledStudents = await Promise.all(studentPromises);
  }

  private async assignAssignments() {
    if (!this.shouldAssignAssignments) {
      return;
    }
    const assignments = this.assignmentsBuilders.map((builder) =>
      builder.getAssignment()
    );
    return Promise.all(
      this.studentsBuilders.map((builder) =>
        builder.assignAssignments(assignments)
      )
    );
  }

  private async submitAssignments() {
    if (!this.shouldSubmitAssignments) {
      return;
    }

    const assignments = this.assignmentsBuilders.map((builder) =>
      builder.getAssignment()
    );
    return Promise.all(
      this.studentsBuilders.map((builder) =>
        builder.submitAssignments(assignments)
      )
    );
  }

  private async gradeAssignments() {
    if (!this.shouldGradeAssignments) {
      return;
    }

    const assignments = this.assignmentsBuilders.map((builder) =>
      builder.getAssignment()
    );

    return Promise.all(
      this.studentsBuilders.map((builder) =>
        builder.gradeAssignments(assignments)
      )
    );
  }
}

export { ClassRoomBuilder };

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

class AssignmentBuilder {
  private assignment: any;

  constructor() {
    this.assignment = null;
  }

  async build(classId: string) {
    this.assignment = await prisma.assignment.create({
      data: {
        title: faker.lorem.word(),
        classId,
      },
    });

    return this.assignment;
  }

  getAssignment() {
    return this.assignment;
  }
}

const studentAssignmentSubmissionBuilder = async ({
  studentId,
  assignmentId,
}: {
  studentId: string;
  assignmentId: string;
}) => {
  const studentAssignmentUpdated = await prisma.studentAssignment.update({
    where: {
      studentId_assignmentId: {
        assignmentId,
        studentId,
      },
    },
    data: {
      status: "submitted",
    },
  });

  return studentAssignmentUpdated;
};

class ClassBuilder {
  private studentsBuilders: StudentBuilder[];
  private assignmentsBuilders: AssignmentBuilder[];

  private clazz: any;
  private enrolledStudents: any[];
  private shouldAssignAssignments: boolean;

  constructor() {
    this.studentsBuilders = [];
    this.assignmentsBuilders = [];
    this.clazz = null;
    this.enrolledStudents = [];
    this.shouldAssignAssignments = false;
  }

  withStudent(studentBuilder: StudentBuilder) {
    this.studentsBuilders.push(studentBuilder);
    return this;
  }

  withAssignment(assignmentBuilder: AssignmentBuilder) {
    this.assignmentsBuilders.push(assignmentBuilder);
    return this;
  }

  async enrollStudent(studentBuilder: StudentBuilder) {
    if (this.clazz) {
      const student = await studentBuilder.build();
      await prisma.classEnrollment.create({
        data: {
          classId: this.clazz.id,
          studentId: student.id,
        },
      });

      return student;
    }
  }

  withAssignedAssignments() {
    this.shouldAssignAssignments = true;
    return this;
  }

  async build() {
    await this.createClass();
    await this.createStudents();
    await this.createAssignments();
    await this.enrollStudents();
    await this.assignAssignments();

    return {
      clazz: this.clazz,
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
    this.clazz = await prisma.class.create({
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
      this.assignmentsBuilders.map((builder) => builder.build(this.clazz.id))
    );
  }

  private async enrollStudents() {
    const students = this.studentsBuilders.map((builder) =>
      builder.getStudent()
    );
    const studentPromises = students.map((student) => {
      return prisma.classEnrollment.create({
        data: {
          classId: this.clazz.id,
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
}

const studentBuilder = async () => {
  const student = await prisma.student.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  });

  return student;
};

const classEnrollmentBuilder = async (classId: string, studentId: string) => {
  const classEnrollment = await prisma.classEnrollment.create({
    data: {
      classId,
      studentId,
    },
  });

  return classEnrollment;
};

const classBuilder = async () => {
  const class_ = await prisma.class.create({
    data: {
      name: faker.lorem.word(),
    },
  });

  return class_;
};

const assignmentBuilder = async (classId: string) => {
  const assignment = await prisma.assignment.create({
    data: {
      title: faker.lorem.word(),
      classId,
    },
  });

  return assignment;
};

const studentAssignmentBuilder = async ({
  studentId,
  assignmentId,
}: {
  studentId: string;
  assignmentId: string;
}) => {
  const studentAssignment = await prisma.studentAssignment.create({
    data: {
      studentId,
      assignmentId,
    },
  });

  return studentAssignment;
};

const gradedAssignmentBuilder = async ({
  studentId,
  assignmentId,
}: {
  studentId: string;
  assignmentId: string;
}) => {
  const gradedAssignment = await prisma.studentAssignment.update({
    where: {
      studentId_assignmentId: {
        assignmentId,
        studentId,
      },
    },
    data: {
      grade: "A",
    },
  });

  return gradedAssignment;
};

export {
  studentBuilder,
  classBuilder,
  assignmentBuilder,
  classEnrollmentBuilder,
  studentAssignmentBuilder,
  studentAssignmentSubmissionBuilder,
  gradedAssignmentBuilder,
  ClassBuilder,
  StudentBuilder,
  AssignmentBuilder,
};

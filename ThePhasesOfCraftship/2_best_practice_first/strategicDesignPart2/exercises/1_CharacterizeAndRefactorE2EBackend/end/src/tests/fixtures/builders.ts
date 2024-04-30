import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

class StudentBuilder {
  private data: any;

  constructor() {
    this.data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
  }

  build() {
    return prisma.student.create({
      data: this.data,
    });
  }
}

class AssignmentBuilder {
  private data: any;

  constructor() {
    this.data = {
      title: faker.lorem.word(),
    };
  }

  build(classId: string) {
    return prisma.assignment.create({
      data: {
        ...this.data,
        classId,
      },
    });
  }
}

const classEnrollmentBuilder = async (classId: string, studentId: string) => {
  const classEnrollment = await prisma.classEnrollment.create({
    data: {
      classId,
      studentId,
    },
  });

  return classEnrollment;
};

class ClassBuilder {
  private studentsBuilders: StudentBuilder[];
  private assignmentsBuilders: AssignmentBuilder[];

  private clazz: any;

  constructor() {
    this.studentsBuilders = [];
    this.assignmentsBuilders = [];
    this.clazz = null;
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

  async build() {
    this.clazz = await prisma.class.create({
      data: {
        name: faker.lorem.word(),
      },
    });

    const students = await Promise.all(
      this.studentsBuilders.map((builder) => builder.build())
    );
    const assignments = await Promise.all(
      this.assignmentsBuilders.map((builder) => builder.build(this.clazz.id))
    );
    const classEnrollment = await Promise.all(
      students.map((student) => {
        return prisma.classEnrollment.create({
          data: {
            classId: this.clazz.id,
            studentId: student.id,
          },
        });
      })
    );

    return {
      clazz: this.clazz,
      students,
      assignments,
      classEnrollment,
    };
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

const studentAssignmentBuilder = async (
  studentId: string,
  assignmentId: string
) => {
  const studentAssignment = await prisma.studentAssignment.create({
    data: {
      studentId,
      assignmentId,
    },
  });

  return studentAssignment;
};

const studentAssignmentSubmissionBuilder = async (
  studentAssignmentId: string
) => {
  const studentAssignmentUpdated = await prisma.studentAssignment.update({
    where: {
      id: studentAssignmentId,
    },
    data: {
      status: "submitted",
    },
  });

  return studentAssignmentUpdated;
};

const gradedAssignmentBuilder = async (studentAssignmentId: string) => {
  const gradedAssignment = await prisma.studentAssignment.update({
    where: {
      id: studentAssignmentId,
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

import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

class StudentBuilder {
  private data: any

  constructor() {
    this.data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
  }

  build() {
    return prisma.student.create({
      data: this.data
    })
  }
}

class AssignmentBuilder {
  private data: any;

  constructor() {
    this.data = {
      title: faker.lorem.word()
    }
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

class ClassBuilder {
  private studentsBuilders: StudentBuilder[]
  private assignmentsBuilders: AssignmentBuilder[]

  constructor() {
    this.studentsBuilders = []
    this.assignmentsBuilders = []
  }


  withStudent(studentBuilder: any) {
    this.studentsBuilders.push(studentBuilder)
    return this
  }

  withAssignment(assignmentBuilder: any) {
    this.assignmentsBuilders.push(assignmentBuilder)
    return this
  }

  async build() {
    const clazz = await prisma.class.create({
      data: {
        name: faker.lorem.word(),
      },
    });

    const students = await Promise.all(this.studentsBuilders.map(builder => builder.build()))
    const assignments = await Promise.all(this.assignmentsBuilders.map(builder => builder.build(clazz.id)))


    return {
      clazz, students, assignments
    }
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

const classEnrollmentBuilder = async (classId: string, studentId: string) => {
  const classEnrollment = await prisma.classEnrollment.create({
    data: {
      classId,
      studentId,
    },
  });

  return classEnrollment;
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
  AssignmentBuilder
};

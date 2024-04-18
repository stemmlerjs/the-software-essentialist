import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

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

export {
  studentBuilder,
  classBuilder,
  assignmentBuilder,
  classEnrollmentBuilder,
  studentAssignmentBuilder,
};

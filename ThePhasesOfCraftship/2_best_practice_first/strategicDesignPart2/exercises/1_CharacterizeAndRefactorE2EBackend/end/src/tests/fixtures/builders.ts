import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

const studentBuilder = async () => {
  const student = await prisma.student.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  });

  return {
    student,
  };
};

const classBuilder = async () => {
  const class_ = await prisma.class.create({
    data: {
      name: faker.lorem.word(),
    },
  });

  return {
    class_,
  };
};

const assignmentBuilder = async () => {
  const { class_ } = await classBuilder();
  const assignment = await prisma.assignment.create({
    data: {
      title: faker.lorem.word(),
      classId: class_.id,
    },
  });

  return {
    assignment,
    class_,
  };
};

const classEnrollmentBuilder = async () => {
  const { student } = await studentBuilder();
  const { class_ } = await classBuilder();

  const classEnrollment = await prisma.classEnrollment.create({
    data: {
      classId: class_.id,
      studentId: student.id,
    },
  });

  return {
    student,
    class_,
    classEnrollment,
  };
};

const studentAssignmentBuilder = async () => {
  const { student } = await studentBuilder();
  const { assignment, class_ } = await assignmentBuilder();

  const studentAssignment = await prisma.studentAssignment.create({
    data: {
      studentId: student.id,
      assignmentId: assignment.id,
    },
  });

  return {
    student,
    class_,
    assignment,
    studentAssignment,
  };
};

export {
  studentBuilder,
  classBuilder,
  assignmentBuilder,
  classEnrollmentBuilder,
  studentAssignmentBuilder,
};

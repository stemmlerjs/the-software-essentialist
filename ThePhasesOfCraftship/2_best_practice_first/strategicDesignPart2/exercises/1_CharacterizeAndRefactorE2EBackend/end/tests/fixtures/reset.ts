import { prisma } from "../../src/database";

async function resetDatabase() {
  const deleteAllClassEnrollments = prisma.classEnrollment.deleteMany();
  const deleteAllStudentAssignments = prisma.studentAssignment.deleteMany();
  const deleteAllStudents = prisma.student.deleteMany();
  const deleteAllClasses = prisma.class.deleteMany();
  const deleteAllAssignments = prisma.assignment.deleteMany();

  try {
    await prisma.$transaction([
      deleteAllClassEnrollments,
      deleteAllStudentAssignments,
      deleteAllStudents,
      deleteAllClasses,
      deleteAllAssignments,
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export { resetDatabase };

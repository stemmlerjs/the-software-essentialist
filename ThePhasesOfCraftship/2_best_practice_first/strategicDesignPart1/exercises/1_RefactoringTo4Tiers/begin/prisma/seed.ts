import { Student, Class, Assignment, StudentAssignment, ReportCard, ClassGradeReport, ClassEnrollment } from "@prisma/client";
import { prisma } from "../src/database";


async function seed() {
  const students = await Promise.all(
    new Array(4).fill(null).map(async (_, i) => {
      return prisma.student.create({
        data: {
          name: `Student ${i + 1}`,
        },
      });
    }),
  );

  const classes = await Promise.all(
    new Array(4).fill(null).map(async (_, i) => {
      return prisma.class.create({
        data: {
          name: `Class ${i + 1}`,
        },
      });
    }),
  );

  const assignments = await Promise.all(
    classes.map(async (cls, i) => {
      return prisma.assignment.create({
        data: {
          classId: cls.id,
          title: `Assignment ${i + 1}`,
        },
      });
    }),
  );

  
  // Enroll students in classes and create student assignments with grades
  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < classes.length; j++) {
      await prisma.classEnrollment.create({
        data: {
          studentId: students[i].id,
          classId: classes[j].id,
        },
      });

      await prisma.studentAssignment.create({
        data: {
          studentId: students[i].id,
          assignmentId: assignments[j].id,
          grade: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)], // Randomly assign grades
        },
      });
    }
  }

  for (let student of students) {
    await prisma.reportCard.create({
      data: {
        studentId: student.id,
      },
    });
  }

  for (let cls of classes) {
    await prisma.classGradeReport.create({
      data: {
        classId: cls.id,
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
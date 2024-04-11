import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };

interface StudentPersistence {
  save(name: string): any;
  getAll(): any;
  getById(id: string): any;
  getAssignments(id: string): any;
  getGrades(id: string): any;
}

interface ClassPersistence {
  save(name: string): any;
  getById(id: string): any;
  getEnrollment(classId: string, studentId: string): any;
  saveEnrollment(classId: string, studentId: string): any;
  getAssignments(classId: string): any;
}

class Database {
  public students: StudentPersistence;
  public classes: ClassPersistence;

  constructor() {
    this.students = this.buildStudentPersistence();
    this.classes = this.buildClassPersistence();
  }

  private buildStudentPersistence(): StudentPersistence {
    return {
      save: this.saveStudent,
      getAll: this.getAllStudents,
      getById: this.getStudentById,
      getAssignments: this.getStudentAssignments,
      getGrades: this.getStudentGrades,
    };
  }

  private async saveStudent(name: string) {
    const data = await prisma.student.create({
      data: {
        name,
      },
    });

    return data;
  }

  private async getAllStudents() {
    const data = await prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return data;
  }

  private async getStudentById(id: string) {
    const data = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    return data;
  }

  private async getStudentAssignments(id: string) {
    const data = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }

  private async getStudentGrades(id: string) {
    const data = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }

  private buildClassPersistence(): ClassPersistence {
    return {
      save: this.saveClass,
      getById: this.getClassById,
      getEnrollment: this.getEnrollment,
      saveEnrollment: this.saveEnrollment,
      getAssignments: this.getClassAssignments,
    };
  }

  private async saveClass(name: string) {
    const data = await prisma.class.create({
      data: {
        name,
      },
    });

    return data;
  }

  private async getClassById(id: string) {
    const data = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  private async getEnrollment(classId: string, studentId: string) {
    const data = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    return data;
  }

  private async saveEnrollment(classId: string, studentId: string) {
    const data = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return data;
  }

  private async getClassAssignments(classId: string) {
    const data = await prisma.assignment.findMany({
      where: {
        classId: classId,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return data;
  }
}

export { Database };

export default Database;

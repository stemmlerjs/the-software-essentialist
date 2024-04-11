import { PrismaClient } from "@prisma/client";

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

interface AssignmentPersistence {
  save(classId: string, title: string): any;
  getById(assignmentId: string): any;
  addStudent(assignmentId: string, studentId: string): any;
  getStudentAssignment(assignmentId: string, studentId: string): any;
  submit(id: string): any;
  grade(id: string, grade: string): any;
}

class Database {
  public students: StudentPersistence;
  public classes: ClassPersistence;
  public assignments: AssignmentPersistence;

  constructor(private prisma: PrismaClient) {
    this.students = this.buildStudentPersistence();
    this.classes = this.buildClassPersistence();
    this.assignments = this.buildAssignmentPersistence();
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

  private buildClassPersistence(): ClassPersistence {
    return {
      save: this.saveClass,
      getById: this.getClassById,
      getEnrollment: this.getEnrollment,
      saveEnrollment: this.saveEnrollment,
      getAssignments: this.getClassAssignments,
    };
  }

  private buildAssignmentPersistence(): AssignmentPersistence {
    return {
      save: this.saveAssignment,
      getById: this.getAssignmentById,
      addStudent: this.setStudentAssignment,
      getStudentAssignment: this.getStudentAssignment,
      submit: this.submitAssignment,
      grade: this.gradeAssignment,
    };
  }

  private async saveStudent(name: string) {
    const data = await this.prisma.student.create({
      data: {
        name,
      },
    });

    return data;
  }

  private async getAllStudents() {
    const data = await this.prisma.student.findMany({
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
    const data = await this.prisma.student.findUnique({
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
    const data = await this.prisma.studentAssignment.findMany({
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
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }

  private async saveClass(name: string) {
    const data = await this.prisma.class.create({
      data: {
        name,
      },
    });

    return data;
  }

  private async getClassById(id: string) {
    const data = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  private async getEnrollment(classId: string, studentId: string) {
    const data = await this.prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    return data;
  }

  private async saveEnrollment(classId: string, studentId: string) {
    const data = await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return data;
  }

  private async getClassAssignments(classId: string) {
    const data = await this.prisma.assignment.findMany({
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

  private async saveAssignment(classId: string, title: string) {
    const data = await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return data;
  }

  private async getAssignmentById(assignmentId: string) {
    const data = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    return data;
  }

  private async setStudentAssignment(assignmentId: string, studentId: string) {
    const data = await this.prisma.studentAssignment.create({
      data: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  private async getStudentAssignment(assignmentId: string, studentId: string) {
    const data = await this.prisma.studentAssignment.findFirst({
      where: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  private async submitAssignment(id: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    return data;
  }

  private async gradeAssignment(id: string, grade: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });

    return data;
  }
}

export { Database };

export default Database;

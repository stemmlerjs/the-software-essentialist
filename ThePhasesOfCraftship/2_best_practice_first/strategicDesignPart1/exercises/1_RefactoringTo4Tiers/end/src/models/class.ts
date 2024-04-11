import { prisma } from "../database";

class Class {
  static async save(name: string): Promise<Class> {
    const data = await prisma.class.create({
      data: {
        name,
      },
    });

    return data;
  }

  static async getById(id: string): Promise<Class | null> {
    const data = await prisma.class.findUnique({
        where: {
          id,
        },
      });

      return data;
  }

  static async getStudent(classId: string, studentId: string) {
    const data = await prisma.classEnrollment.findFirst({
        where: {
          studentId,
          classId,
        },
      });

      return data;
  }

  static async saveStudent(classId: string, studentId: string) {
    const data = await prisma.classEnrollment.create({
        data: {
          studentId,
          classId,
        },
      });

      return data;
  }


}

export default Class;

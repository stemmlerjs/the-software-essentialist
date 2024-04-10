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
}

export default Class;

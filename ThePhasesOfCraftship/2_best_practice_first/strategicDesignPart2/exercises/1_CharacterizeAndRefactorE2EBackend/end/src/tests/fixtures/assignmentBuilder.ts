import { prisma } from "../../database";
import { faker } from "@faker-js/faker";

class AssignmentBuilder {
  private assignment: any;

  constructor() {
    this.assignment = null;
  }

  async build(classId: string) {
    this.assignment = await prisma.assignment.create({
      data: {
        title: faker.lorem.word(),
        classId,
      },
    });

    return this.assignment;
  }

  getAssignment() {
    return this.assignment;
  }
}

export { AssignmentBuilder };

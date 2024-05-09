import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { Assignment } from "./types";

class AssignmentBuilder {
  private assignment: Assignment;

  constructor() {
    this.assignment = {
      id: "",
      classId: "",
      title: "",
    };
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

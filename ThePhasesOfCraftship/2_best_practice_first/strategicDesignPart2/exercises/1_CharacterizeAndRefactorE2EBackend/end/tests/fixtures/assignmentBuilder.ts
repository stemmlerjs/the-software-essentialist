import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { ClassRoomBuilder } from "./classRoomBuilder";
import { Assignment } from "@prisma/client";

class AssignmentBuilder {
  private assignment: Partial<Assignment>;
  private classRoomBuilder: ClassRoomBuilder;

  constructor() {
    this.assignment = {
      title: faker.lorem.word(),
    };
    this.classRoomBuilder = new ClassRoomBuilder();
  }

  from (classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  async build() {
    const classRoom = await this.classRoomBuilder.build();
    
    this.assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: classRoom.id
      },
    });

    return this.assignment;
  }
}

export { AssignmentBuilder };

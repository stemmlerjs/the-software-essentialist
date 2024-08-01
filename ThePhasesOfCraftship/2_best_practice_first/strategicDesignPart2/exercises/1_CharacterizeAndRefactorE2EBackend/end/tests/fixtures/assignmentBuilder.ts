import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { Assignment } from "./types";
import { ClassRoomBuilder } from "./classRoomBuilder";

class AssignmentBuilder {
  private assignment: Assignment;
  private classRoomBuilder: ClassRoomBuilder;

  constructor() {
    this.assignment = {
      id: "",
      classId: "",
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
        title: this.assignment.title,
        classId: classRoom.id
      },
    });

    return this.assignment;
  }
}

export { AssignmentBuilder };

import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { ClassroomBuilder } from "./classRoomBuilder";
import { Assignment } from "@prisma/client";

class AssignmentBuilder {
  private assignment: Partial<Assignment>;
  private classRoomBuilder: ClassroomBuilder | undefined;

  constructor() {
    this.classRoomBuilder = undefined
    this.assignment = {
      title: faker.lorem.word(),
    };
  }

  from (classRoomBuilder: ClassroomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  withTitle (title: string) {
    this.assignment.title = title;
    return this;
  }

  async build() {
    if (this.classRoomBuilder === undefined) throw new Error('classroomBuilder not defined')
    const classRoom = await this.classRoomBuilder.build();
    
    this.assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: classRoom.id
      },
    });

    let assignment = this.assignment as Assignment;

    return { assignment, classRoom }
  }
}

export { AssignmentBuilder };
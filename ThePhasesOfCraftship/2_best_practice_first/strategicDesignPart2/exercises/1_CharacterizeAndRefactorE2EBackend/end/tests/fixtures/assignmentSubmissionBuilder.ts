
import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { AssignmentSubmission } from "@prisma/client";
import { StudentAssignmentBuilder } from "./studentAssignmentBuilder";

class AssignmentSubmissionBuilder {
  private assignmentSubmission: Partial<AssignmentSubmission>;
  private studentAssignmentBuilder?: StudentAssignmentBuilder;

  constructor() {
    this.assignmentSubmission = {
      submissionContent: faker.word.words()
    };
  }

  from (studentAssignmentBuilder: StudentAssignmentBuilder) {
    this.studentAssignmentBuilder = studentAssignmentBuilder;
    return this;
  }

  async build () {
    if (!this.studentAssignmentBuilder) throw new Error('You must define the student assignment builder')
    const studentAssignment = await this.studentAssignmentBuilder.build();
    
    const assignmentSubmission = await prisma.assignmentSubmission.create({
      data: {
        studentAssignmentId: studentAssignment.id,
        submissionContent: this.assignmentSubmission.submissionContent
      }
    });

    return { assignmentSubmission, studentAssignment };
  }
}

export { AssignmentSubmissionBuilder };
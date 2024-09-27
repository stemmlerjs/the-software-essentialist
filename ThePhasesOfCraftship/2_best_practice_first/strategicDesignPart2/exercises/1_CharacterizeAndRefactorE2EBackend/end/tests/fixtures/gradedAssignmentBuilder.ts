
import { GradedAssignment } from "@prisma/client";
import { prisma } from "../../src/database";
import { AssignmentSubmissionBuilder } from "./assignmentSubmissionBuilder";

export class GradedAssignmentBuilder {
  private assignmentSubmissionBuilder?: AssignmentSubmissionBuilder;
  private gradedAssignment: Partial<GradedAssignment>;

  constructor () {
    this.gradedAssignment = {}
  }

  from (assignmentSubmissionBuilder: AssignmentSubmissionBuilder) {
    this.assignmentSubmissionBuilder = assignmentSubmissionBuilder;
    return this;
  }

  withGrade (grade: string) {
    this.gradedAssignment.grade = grade;
    return this;
  }

  async build() {
    if (!this.assignmentSubmissionBuilder) throw new Error ("You must define the assignment submission builder");
    
    let submission = await this.assignmentSubmissionBuilder
      .build();
    
    let gradedAssignment: GradedAssignment = await prisma.gradedAssignment.create({
      data: {
        assignmentSubmissionId: submission.assignmentSubmission.id,
        grade: this.gradedAssignment.grade
      }
    });
    

    return { gradedAssignment, submission }
  }
}
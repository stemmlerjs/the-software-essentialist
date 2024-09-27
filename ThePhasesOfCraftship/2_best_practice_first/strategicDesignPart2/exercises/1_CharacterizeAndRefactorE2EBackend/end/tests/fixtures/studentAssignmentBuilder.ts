
import { StudentAssignment } from "@prisma/client";
import { prisma } from "../../src/database";
import { AssignmentBuilder } from "./assignmentBuilder";
import { EnrolledStudentBuilder } from "./enrolledStudentBuilder";

export class StudentAssignmentBuilder {
  private enrolledStudentBuilder?: EnrolledStudentBuilder;
  private assignmentBuilder?: AssignmentBuilder;

  
  from (assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  and (enrolledStudentBuilder: EnrolledStudentBuilder) {
    this.enrolledStudentBuilder = enrolledStudentBuilder;
    return this;
  }

  async build() {
    if (!this.enrolledStudentBuilder) throw new Error("you must define the enrolled student builder");
    if (!this.assignmentBuilder) throw new Error("you must define the assignment builder")

    let assignment = await this.assignmentBuilder
      .build();

    let enrolledStudent = await this.enrolledStudentBuilder
      .build();
    
    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: enrolledStudent.student.id,
        assignmentId: assignment.assignment.id
      }
    });

    return studentAssignment as StudentAssignment
  }
}
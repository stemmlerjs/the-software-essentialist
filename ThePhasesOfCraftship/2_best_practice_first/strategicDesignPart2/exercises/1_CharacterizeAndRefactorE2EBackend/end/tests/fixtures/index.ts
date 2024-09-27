import { StudentBuilder } from "./studentBuilder";
import { AssignmentBuilder } from "./assignmentBuilder";
import { ClassroomBuilder } from "./classRoomBuilder";
import {
  Assignment,
  ClassRoom,
  EnrolledStudent,
  Student,
  StudentAssignment,
} from "./types";
import { EnrolledStudentBuilder } from "./enrolledStudentBuilder";
import { AssignmentSubmissionBuilder } from "./assignmentSubmissionBuilder";
import { StudentAssignmentBuilder } from "./studentAssignmentBuilder";
import { GradedAssignmentBuilder } from "./gradedAssignmentBuilder";


function aStudent() {
  return new StudentBuilder();
}

function aClassRoom () {
  return new ClassroomBuilder()
}

function anAssignment () {
  return new AssignmentBuilder();
}

function anEnrolledStudent () {
  return new EnrolledStudentBuilder();
}

function aStudentAssigment () {
  return new StudentAssignmentBuilder();
}

function anAssignmentSubmission () {
  return new AssignmentSubmissionBuilder();
}

function aGradedAssignment () {
  return new GradedAssignmentBuilder()
}

export {
  aStudent,
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
  anAssignmentSubmission,
  aStudentAssigment,
  aGradedAssignment,
  StudentBuilder,
  AssignmentBuilder,
  ClassroomBuilder,
  Assignment,
  ClassRoom,
  EnrolledStudent,
  Student,
  StudentAssignment,
};
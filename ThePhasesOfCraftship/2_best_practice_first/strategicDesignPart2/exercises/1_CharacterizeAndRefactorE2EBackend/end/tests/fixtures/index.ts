import { StudentBuilder } from "./studentBuilder";
import { AssignmentBuilder } from "./assignmentBuilder";
import { ClassRoomBuilder } from "./classRoomBuilder";
import {
  Assignment,
  ClassRoom,
  EnrolledStudent,
  Student,
  StudentAssignment,
} from "./types";
import { EnrolledStudentBuilder } from "./enrolledStudentBuilder";

function aStudent() {
  return new StudentBuilder();
}

function aClassRoom () {
  return new ClassRoomBuilder()
}

function anAssignment () {
  return new AssignmentBuilder();
}

function anEnrolledStudent () {
  return new EnrolledStudentBuilder();
}

export {
  aStudent,
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
  StudentBuilder,
  AssignmentBuilder,
  ClassRoomBuilder,
  Assignment,
  ClassRoom,
  EnrolledStudent,
  Student,
  StudentAssignment,
};

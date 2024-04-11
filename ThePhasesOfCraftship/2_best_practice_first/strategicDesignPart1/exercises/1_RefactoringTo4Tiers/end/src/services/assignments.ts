import Database from "../database";
import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  SubmitAssignmentDTO,
} from "../dtos/assignments";
import {
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from "../shared/exceptions";

class AssignmentsService {
  constructor(private db: Database) {}

  createAssignment = async (dto: CreateAssignmentDTO) => {
    const { classId, title } = dto;

    const response = await this.db.assignments.save(classId, title);

    return response;
  };

  assignStudent = async (dto: AssignStudentDTO) => {
    const { studentId, assignmentId } = dto;

    const student = await this.db.students.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const assignment = await this.db.assignments.getById(assignmentId);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    const response = await this.db.assignments.addStudent(
      assignmentId,
      studentId
    );

    return response;
  };

  submitAssignment = async (dto: SubmitAssignmentDTO) => {
    const { studentId, assignmentId } = dto;

    const assignment = await this.db.assignments.getStudentAssignment(
      assignmentId,
      studentId
    );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const response = await this.db.assignments.submit(assignment.id);

    return response;
  };
}

export default AssignmentsService;

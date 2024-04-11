import Database from "../database";
import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from "../dtos/assignments";
import {
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from "../shared/exceptions";

class AssignmentsService {
  constructor(private db: Database) {}

  async createAssignment (dto: CreateAssignmentDTO) {
    const { classId, title } = dto;

    const response = await this.db.assignments.save(classId, title);

    return response;
  };

  async assignStudent (dto: AssignStudentDTO) {
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

  async submitAssignment (dto: SubmitAssignmentDTO) {
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

  async gradeAssignment (dto: GradeAssignmentDTO) {
    const { studentId, assignmentId, grade } = dto;

    const assignment = await this.db.assignments.getStudentAssignment(
      assignmentId,
      studentId
    );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const response = await this.db.assignments.grade(assignment.id, grade);

    return response;
  };
}

export default AssignmentsService;

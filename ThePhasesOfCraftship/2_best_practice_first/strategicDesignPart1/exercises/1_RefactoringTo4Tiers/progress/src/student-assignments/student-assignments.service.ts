import { AssignmentPersistence, StudentAssignmentPersistence, StudentPersistence } from "../shared/database";
import { AssignmentNotFoundException, InvalidGradeException, StudentAssignmentNotFoundException, StudentNotFoundException } from "../shared/errors";

export class StudentAssignmentsService {
	studentsPersistence: StudentPersistence;
	assignmentsPersistence: AssignmentPersistence;
	studentAssignmentsPersistence: StudentAssignmentPersistence;

	constructor(studentPersistence: StudentPersistence, assignmentPersistence: AssignmentPersistence, studentAssignmentPersistence: StudentAssignmentPersistence) {
		this.studentsPersistence = studentPersistence;
		this.assignmentsPersistence = assignmentPersistence;
		this.studentAssignmentsPersistence = studentAssignmentPersistence;
	}

	async assignStudentToAssignment(studentId: string, assignmentId: string) {
		const student = await this.studentsPersistence.getById(studentId);

		if (!student) {
			throw new StudentNotFoundException();
		}

		const assignment = await this.assignmentsPersistence.getById(assignmentId);

		if (!assignment) {
			throw new AssignmentNotFoundException();
		}

		return await this.studentAssignmentsPersistence.create(studentId, assignmentId);
	}

	async submitAssignment(id: string) {
		const studentAssignment = this.studentAssignmentsPersistence.getById(id);

		if (!studentAssignment) {
			throw new StudentAssignmentNotFoundException();
		}

		return this.studentAssignmentsPersistence.submit(id);
	}

	async gradeAssignment(id: string, grade: string) {
		if (!['A', 'B', 'C', 'D'].includes(grade)) {
			throw new InvalidGradeException();
		}
		
		// check if student assignment exists
		const studentAssignment = await this.studentAssignmentsPersistence.getById(id);
	
		if (!studentAssignment) {
			throw new StudentAssignmentNotFoundException();
		}

		return this.studentAssignmentsPersistence.grade(id, grade);
	}
}
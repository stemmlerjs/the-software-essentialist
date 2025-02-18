import { StudentAssignmentPersistence, StudentPersistence } from "../shared/database";
import { StudentNotFoundException } from "../shared/errors";

export class StudentsService {
	studentPersistence: StudentPersistence;
	studentAssignmentPersistence: StudentAssignmentPersistence;
	
	constructor(studentPersistence: StudentPersistence, studentAssignmentPersistence: StudentAssignmentPersistence) {
		this.studentPersistence = studentPersistence;
		this.studentAssignmentPersistence = studentAssignmentPersistence;
	}

	async createStudent(name: string) {
		return this.studentPersistence.create(name);
	}

	async getStudents() {
		return this.studentPersistence.getAll();
	}

	async getStudent(id: string) {
		const student = await this.studentPersistence.getById(id);

		if (!student) {
			throw new StudentNotFoundException();
		}

		return student;
	}

	async getStudentAssignments(id: string) {
		await this.getStudent(id);

		return await this.studentAssignmentPersistence.getAllForStudent(id)
	}

	async getStudentGrades(id: string) {
		await this.getStudent(id);

		return this.studentAssignmentPersistence.getAllGradedForStudent(id);
	}
}
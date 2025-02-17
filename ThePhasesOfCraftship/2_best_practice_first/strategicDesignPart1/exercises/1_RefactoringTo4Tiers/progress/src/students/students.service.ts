import { prisma } from "../shared/database";
import { StudentNotFoundException } from "../shared/errors";

export class StudentsService {
	async createStudent(name: string) {
		return await prisma.student.create({
			data: {
				name
			}
		});
	}

	async getStudents() {
		return await prisma.student.findMany({
			include: {
				classes: true,
				assignments: true,
				reportCards: true
			}, 
			orderBy: {
				name: 'asc'
			}
		});
	}

	async getStudent(id: string) {
		const student = await prisma.student.findUnique({
			where: {
				id
			},
			include: {
				classes: true,
				assignments: true,
				reportCards: true
			}
		});

		if (!student) {
			throw new StudentNotFoundException();
		}

		return student;
	}

	async getStudentAssignments(id: string) {
		await this.getStudent(id);

		return await prisma.studentAssignment.findMany({
			where: {
				studentId: id,
				status: 'submitted'
			},
			include: {
				assignment: true
			},
		});
	}

	async getStudentGrades(id: string) {
		await this.getStudent(id);

		return await prisma.studentAssignment.findMany({
			where: {
				studentId: id,
				status: 'submitted',
				grade: {
					not: null
				}
			},
			include: {
				assignment: true
			},
		});
	}
}
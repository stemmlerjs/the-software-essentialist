import { prisma } from "../database";

import { StudentNotFoundException } from "./exceptions";

export class StudentsService {
	constructor() {}

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

		return student
	}

	async getStudents() {
		const students = await prisma.student.findMany({
			include: {
				classes: true,
				assignments: true,
				reportCards: true
			}, 
			orderBy: {
				name: 'asc'
			}
		});

		return students
	}

	async createStudent(name: string) {
		const student = await prisma.student.create({
			data: {
				name
			}
		});

		return student
	}
}
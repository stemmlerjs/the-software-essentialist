import { prisma } from "../database";
import { ClassNotFoundException } from "./exceptions";

export class ClassesService {
	async createClass(name: string) {
		return await prisma.class.create({
			data: {
				name
			}
		});
	}

	async getClass(id: string) {

		const cls = await prisma.class.findUnique({
			where: {
				id
			}
		});

		if (!cls) {
			throw new ClassNotFoundException();
		}

		return cls;
	}

	async enrollStudent(studentId: string, classId: string) {
		const student = await prisma.student.findUnique({
			where: {
				id: studentId
			}
		});
	
		if (!student) {
			throw new StudentNotFoundException();
		}
	
		// check if class exists
		const cls = await prisma.class.findUnique({
			where: {
				id: classId
			}
		});

		// check if student is already enrolled in class
		const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
			where: {
				studentId,
				classId
			}
		});

		if (duplicatedClassEnrollment) {
			throw new StudentAlreadyEnrolledException();
		}
	
		if (!cls) {
			throw new ClassNotFoundException();
		}
	
		const classEnrollment = await prisma.classEnrollment.create({
			data: {
				studentId,
				classId
			}
		});
	}
}
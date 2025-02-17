import { prisma } from "../shared/database";
import { ClassNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException } from "../shared/errors";

export class EnrollmentsService {
	async enrollStudentInClass(studentId: string, classId: string) {
		const student = await prisma.student.findUnique({
			where: {
				id: studentId
			}
		});

		if (!student) {
			throw new StudentNotFoundException();
		}

		const cls = await prisma.class.findUnique({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new ClassNotFoundException();
		}

		const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
			where: {
				studentId,
				classId
			}
		});

		if (duplicatedClassEnrollment) {
			throw new StudentAlreadyEnrolledException();
		}

		return await prisma.classEnrollment.create({
			data: {
				studentId,
				classId
			}
		});
	}
}
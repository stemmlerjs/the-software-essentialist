import { ClassPersistence, EnrollmentPersistence, prisma, StudentPersistence } from "../shared/database";
import { ClassNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException } from "../shared/errors";

export class EnrollmentsService {
	enrollmentPersistence: EnrollmentPersistence;
	studentPersistence: StudentPersistence
	classPersistence: ClassPersistence;

	constructor(
		enrollmentPersistence: EnrollmentPersistence,
		studentPersistence: StudentPersistence,
		classPersistence: ClassPersistence
	) {
		this.enrollmentPersistence = enrollmentPersistence;
		this.studentPersistence = studentPersistence;
		this.classPersistence = classPersistence;
	}

	async enrollStudentInClass(studentId: string, classId: string) {
		const student = this.studentPersistence.getById(studentId);

		if (!student) {
			throw new StudentNotFoundException();
		}

		const cls = await this.classPersistence.getById(classId);

		if (!cls) {
			throw new ClassNotFoundException();
		}

		const duplicatedClassEnrollment = await this.enrollmentPersistence.getForClassStudent(classId, studentId);

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
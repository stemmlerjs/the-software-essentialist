import { ClassesService } from "../classes/classes.service";
import { prisma } from "../database";
import { StudentsService } from "../students/students.service";
import { StudentAlreadyEnrolledException } from "./exceptions";

export class ClassEnrollmentsService {
	studentService: StudentsService
	classesService: ClassesService

	constructor(studentsService: StudentsService, classesService: ClassesService) {
		this.studentService = studentsService;
		this.classesService = classesService;
	}

	async enrollStudent(studentId: string, classId: string) {
		const student = await this.studentService.getStudent(studentId);
		const cls = await this.classesService.getClass(classId);

		const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
			where: {
				studentId: student.id,
				classId: cls.id
			}
		});

		if (duplicatedClassEnrollment) {
			throw new StudentAlreadyEnrolledException();
		}
	
		const classEnrollment = await prisma.classEnrollment.create({
			data: {
				studentId,
				classId
			}
		});

		return classEnrollment
	}
}
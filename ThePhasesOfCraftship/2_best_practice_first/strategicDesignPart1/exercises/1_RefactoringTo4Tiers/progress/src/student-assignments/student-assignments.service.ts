import { AssignmentsService } from "../assignments/assignments.service";
import { InvalidGradeException } from "../assignments/exceptions";
import { prisma } from "../database";
import { StudentsService } from "../students/students.service";

import { StudentAssignmentNotFoundException } from "./exceptions";

export class StudentAssignmentsService {
	assignmentsService: AssignmentsService;
	studentsService: StudentsService;

	constructor(assignmentsService: AssignmentsService, studentsService: StudentsService) {
		this.assignmentsService = assignmentsService;
		this.studentsService = studentsService;
	}

	async getStudentAssignment(id: string) {
		const studentAssignment = await prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});

		if (!studentAssignment) {
			throw new StudentAssignmentNotFoundException();
		}

		return studentAssignment;
	}

	async getStudentAssignments(studentId: string, graded = false) {
		const student = await this.studentsService.getStudent(studentId);
		
		return await prisma.studentAssignment.findMany({
			where: {
				studentId: student.id,
				status: 'submitted',
				...(graded && { NOT: { grade: null } })
			},
			include: {
				assignment: true
			},
		});
	}

	async assignStudent(studentId: string, assignmentId: string) {
		const student = await this.studentsService.getStudent(studentId);
		const assignment = await this.assignmentsService.getAssignment(assignmentId);
	
		return await prisma.studentAssignment.create({
			data: {
				studentId: student.id,
				assignmentId: assignment.id,
			}
		});
	}

	async submitAssignment(id: string) {
		const studentAssignment = await this.getStudentAssignment(id);

		return await prisma.studentAssignment.update({
			where: {
				id: studentAssignment.id
			},
			data: {
				status: 'submitted'
			}
		});
	}

	async gradeAssignment(id: string, grade: string) {
		if (!['A', 'B', 'C', 'D'].includes(grade)) {
			throw new InvalidGradeException();
		}
		
		const studentAssignment = await this.getStudentAssignment(id)

		return await prisma.studentAssignment.update({
			where: {
				id: studentAssignment.id
			},
			data: {
				grade,
			}
		});
	}
}
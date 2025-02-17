import { prisma } from "../shared/database";
import { AssignmentNotFoundException, InvalidGradeException, StudentAssignmentNotFoundException, StudentNotFoundException } from "../shared/errors";

export class StudentAssignmentsService {
	async assignStudentToAssignment(studentId: string, assignmentId: string) {
		const student = await prisma.student.findUnique({
			where: {
				id: studentId
			}
		});

		if (!student) {
			throw new StudentNotFoundException();
		}

		const assignment = await prisma.assignment.findUnique({
			where: {
				id: assignmentId
			}
		});

		if (!assignment) {
			throw new AssignmentNotFoundException();
		}

		return await prisma.studentAssignment.create({
			data: {
				studentId,
				assignmentId,
			}
		});
	}

	async submitAssignment(id: string) {
		const studentAssignment = await prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});

		if (!studentAssignment) {
			throw new StudentAssignmentNotFoundException();
		}

		return await prisma.studentAssignment.update({
			where: {
				id
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
		
		// check if student assignment exists
		const studentAssignment = await prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});
	
		if (!studentAssignment) {
			throw new StudentAssignmentNotFoundException();
		}
	
		return await prisma.studentAssignment.update({
			where: {
				id
			},
			data: {
				grade,
			}
		});
	}
}
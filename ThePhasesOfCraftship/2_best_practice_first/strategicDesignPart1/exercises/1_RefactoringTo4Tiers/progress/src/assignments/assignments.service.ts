import { prisma } from "../database";

import { AssignmentNotFoundException } from "./exceptions";

export class AssignmentsService {
	async createAssignment(classId: string, title: string) {
		const assignment = await prisma.assignment.create({
			data: {
				classId,
				title
			}
		});

		return assignment;
	}

	async getAssignment(id: string) {
		const assignment = await prisma.assignment.findUnique({
			include: {
				class: true,
				studentTasks: true
			},
			where: {
				id
			}
		});
	
		if (!assignment) {
			throw new AssignmentNotFoundException();
		}

		return assignment;
	}

	async getClassAssignments(classId: string) {}
}
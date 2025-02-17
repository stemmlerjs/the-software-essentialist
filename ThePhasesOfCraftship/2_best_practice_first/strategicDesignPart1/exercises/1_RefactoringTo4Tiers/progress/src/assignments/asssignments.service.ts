import { prisma } from "../shared/database";
import { AssignmentNotFoundException } from "../shared/errors";

export class AssignmentsService {
	async createAssignment(classId: string, title: string) {	
		return await prisma.assignment.create({
			data: {
				classId,
				title
			}
		});
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
}
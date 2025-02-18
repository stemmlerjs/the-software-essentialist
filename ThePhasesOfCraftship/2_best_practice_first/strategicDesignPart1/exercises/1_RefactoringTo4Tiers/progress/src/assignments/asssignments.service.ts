import { AssignmentPersistence, prisma } from "../shared/database";
import { AssignmentNotFoundException } from "../shared/errors";

export class AssignmentsService {
	assignmentPersistence: AssignmentPersistence;

	constructor(assignmentPersistance: AssignmentPersistence) {
		this.assignmentPersistence = assignmentPersistance
	}

	async createAssignment(classId: string, title: string) {	
		return await this.assignmentPersistence.create(classId, title);
	}

	async getAssignment(id: string) {
		const assignment = await this.assignmentPersistence.getById(id);

		if (!assignment) {
			throw new AssignmentNotFoundException();
		}

		return assignment;
	}
}
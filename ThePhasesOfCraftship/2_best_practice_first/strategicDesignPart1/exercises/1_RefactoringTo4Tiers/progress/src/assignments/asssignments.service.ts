import { AssignmentPersistence, prisma } from "../shared/database";
import { AssignmentNotFoundException } from "../shared/errors";
import { CreateAssignmentDTO, GetAssignmentDTO } from "./dto";

export class AssignmentsService {
	assignmentPersistence: AssignmentPersistence;

	constructor(assignmentPersistance: AssignmentPersistence) {
		this.assignmentPersistence = assignmentPersistance
	}

	async createAssignment(createAssignmentDto: CreateAssignmentDTO) {	
		const { classId, title } = createAssignmentDto;
		return await this.assignmentPersistence.create(classId, title);
	}

	async getAssignment(getAssigmentDto: GetAssignmentDTO) {
		const { id } = getAssigmentDto;
		const assignment = await this.assignmentPersistence.getById(id);

		if (!assignment) {
			throw new AssignmentNotFoundException();
		}

		return assignment;
	}
}
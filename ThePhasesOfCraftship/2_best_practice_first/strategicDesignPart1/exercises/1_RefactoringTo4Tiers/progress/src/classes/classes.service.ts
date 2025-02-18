import { AssignmentPersistence, ClassPersistence, prisma } from "../shared/database";
import { ClassNotFoundException } from "../shared/errors";

export class ClassesService {
	classPersistence: ClassPersistence;
	assignmentPersistence: AssignmentPersistence;
	
	constructor(classPersistence: ClassPersistence, assignmentPersistence: AssignmentPersistence) {
		this.classPersistence = classPersistence;
		this.assignmentPersistence = assignmentPersistence;
	}

	async createClass(name: string) {
		return await this.classPersistence.create(name);
	}

	async getClassAssignments(id: string) {
		const cls = await this.classPersistence.getById(id);

		if (!cls) {
			throw new ClassNotFoundException();
		}
		
		return await this.assignmentPersistence.getClassAssignments(id);
	}
}
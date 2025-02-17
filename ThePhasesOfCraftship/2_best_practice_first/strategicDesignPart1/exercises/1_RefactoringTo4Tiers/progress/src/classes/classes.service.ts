import { prisma } from "../shared/database";
import { ClassNotFoundException } from "../shared/errors";

export class ClassesService {
	async createClass(name: string) {
		return await prisma.class.create({
			data: {
				name
			}
		});
	}

	async getClassAssignments(id: string) {
		const cls = await prisma.class.findUnique({
			where: {
				id
			}
		});

		if (!cls) {
			throw new ClassNotFoundException();
		}

		const assignments = await prisma.assignment.findMany({
			where: {
				classId: id
			},
			include: {
				class: true,
				studentTasks: true
			}
		});

		return assignments;
	}
}
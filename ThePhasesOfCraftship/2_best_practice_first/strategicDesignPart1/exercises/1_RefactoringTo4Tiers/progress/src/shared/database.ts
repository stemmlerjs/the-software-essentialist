import { Assignment, Class, PrismaClient, Student, ClassEnrollment, StudentAssignment } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma }

export interface StudentPersistence {
	create(name: string): Promise<Student>
	getById(id: string): Promise<Student | null>
	getAll(): Promise<Student[]>
}

export class StudentPersistenceImpl implements StudentPersistence {
	prisma: PrismaClient;
	
	 constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(name: string) {
		return await prisma.student.create({
			data: {
				name: name
			}
		})
	}

	async getById(id: string) {
		return await prisma.student.findUnique({
			where: {
				id
			}
		});
	}

	async getAll() {
		return await prisma.student.findMany({
			include: {
				classes: true,
				assignments: true,
				reportCards: true
			},
			orderBy: {
				name: 'asc'
			}
		});
	}
}

export interface AssignmentPersistence {
	create(classId: string, title: string): Promise<Assignment>
	getById(id: string): Promise<Assignment | null>
	getClassAssignments(classId: string): Promise<Assignment[]>
}

export class AssignmentPersistenceImpl implements AssignmentPersistence {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(classId: string, title: string) {
		return await prisma.assignment.create({
			data: {
				classId,
				title
			}
		});
	}

	async getById(id: string) {
		return await prisma.assignment.findUnique({
			where: {
				id
			}
		});
	}

	async getClassAssignments(classId: string) {
		return await prisma.assignment.findMany({
			where: {
				classId
			},
			include: {
				class: true,
				studentTasks: true
			}
		});
	}
}

export interface ClassPersistence {
	create(name: string): Promise<Class>
	getById(id: string): Promise<Class | null>
}

export class ClassPersistenceImpl implements ClassPersistence {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(name: string) {
		return prisma.class.create({
			data: {
				name
			}
		});
	}

	async getById(id: string) {
		return prisma.class.findUnique({
			where: {
				id
			}
		});
	}
}

export interface EnrollmentPersistence {
	getForClassStudent(classId: string, studentId: string): Promise<ClassEnrollment | null>
}

export class EnrollmentPersistenceImpl implements EnrollmentPersistence {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	
	async getForClassStudent(classId: string, studentId: string) {
		return prisma.classEnrollment.findFirst({
			where: {
				classId,
				studentId
			}
		});
	}
}

export interface StudentAssignmentPersistence {
	create(studentId: string, assignmentId: string): Promise<StudentAssignment>
	getById(id: string): Promise<StudentAssignment | null>
	getAllForStudent(studentId: string): Promise<StudentAssignment[]>
	getAllGradedForStudent(studentId: string): Promise<StudentAssignment[]>
	submit(id: string): Promise<StudentAssignment>
	grade(id: string, grade: string): Promise<StudentAssignment>
}

export class StudentAssignmentPersistenceImpl implements StudentAssignmentPersistence {
	prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(studentId: string, assignmentId: string) {
		return prisma.studentAssignment.create({
			data: {
				studentId,
				assignmentId
			}
		});
	}
	
	async getById(id: string) {
		return prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});
	}

	async getAllForStudent(studentId: string) {
		return prisma.studentAssignment.findMany({
			where: {
				studentId,
				status: 'submitted'
			},
			include: {
				assignment: true
			},
		});
	}

	async getAllGradedForStudent(studentId: string) {
		return prisma.studentAssignment.findMany({
			where: {
				studentId,
				status: 'submitted',
				grade: {
					not: null
				}
			},
			include: {
				assignment: true
			},
		});
	}

	async submit(id: string) {
		return prisma.studentAssignment.update({
			where: {
				id
			},
			data: {
				status: 'submitted'
			}
		});
	}

	async grade(id: string, grade: string): Promise<StudentAssignment> {
		return await prisma.studentAssignment.update({
			where: {
				id
			},
			data: {
				grade
			}
		});
	}
}
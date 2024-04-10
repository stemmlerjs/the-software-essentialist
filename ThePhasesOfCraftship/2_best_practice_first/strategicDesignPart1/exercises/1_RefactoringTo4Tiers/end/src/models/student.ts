import { prisma } from '../database';

class Student {


    static async save(name: string): Promise<Student> {
        const data = await prisma.student.create({
            data: {
                name
            }
        });

        return data;
    }

    static async getAll(): Promise<Student[]> {
        const data = await prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }, 
            orderBy: {
                name: 'asc'
            }
        });


        return data;
    }

    static async getById(id: string): Promise<Student | null> {
        const data = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });

        return data;
    }
}

export default Student;
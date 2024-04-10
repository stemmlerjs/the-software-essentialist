import { prisma } from '../database';

class Student {

    constructor(private name: string) {}

    private static fromDatabase = (data: any) => {
        return new Student(data.name);
    }

    static async save(name: string): Promise<Student> {
        const data = await prisma.student.create({
            data: {
                name
            }
        });

        return Student.fromDatabase(data);
    }
}

export default Student;
import { CreateStudentDTO } from "../dtos/students";
import Student from "../models/student";


class StudentsService {
    static createStudent = async (dto: CreateStudentDTO) => {
        const name = dto.name

        const student = await Student.save(name)

        return student;
    }

    static getAllStudents = async () => {
        const students = await Student.getAll()

        return students;
    }
}

export default StudentsService;
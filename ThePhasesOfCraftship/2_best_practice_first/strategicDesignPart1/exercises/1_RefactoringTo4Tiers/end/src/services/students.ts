import { CreateStudentDTO, StudentID } from "../dtos/students";
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

    static getStudent = async (dto: StudentID) => {
        const { id } = dto
        const student = await Student.getById(id)

        return student;
    }
}

export default StudentsService;
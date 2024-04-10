import { CreateStudentDTO, StudentID } from "../dtos/students";
import Student from "../models/student";
import { StudentNotFoundException } from "../shared/exceptions";


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

    static getAssignments = async (dto: StudentID) => {
        const { id } = dto
        const estudentExists = !!(await Student.getById(id));

        if (!estudentExists) {
            throw new StudentNotFoundException()
        }

        const studentAssignments = await Student.getAssignments(id)

        return studentAssignments;
    }

    static getGrades = async (dto: StudentID) => {
        const { id } = dto
        const studentExists = !!(await Student.getById(id));

        if (!studentExists) {
            throw new StudentNotFoundException()
        }

        const response = await Student.getGrades(id)

        return response;
    }
}

export default StudentsService;
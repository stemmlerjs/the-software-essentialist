import { CreateStudentDTO } from "../dtos/students";
import Student from "../models/student";


class StudentsService {
    static createStudent = async (dto: CreateStudentDTO) => {
        const name = dto.name

        const student = await Student.save(name)

        return student;
    }
}

export default StudentsService;
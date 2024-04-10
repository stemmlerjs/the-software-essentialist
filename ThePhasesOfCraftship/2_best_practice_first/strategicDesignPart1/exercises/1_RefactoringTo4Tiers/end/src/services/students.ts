import { CreateStudentDTO, StudentID } from "../dtos/students";
import Student from "../models/student";
import { StudentNotFoundException } from "../shared/exceptions";

class StudentsService {
  
  static createStudent = async (dto: CreateStudentDTO) => {
    const name = dto.name;

    const response = await Student.save(name);

    return response;
  };

  static getAllStudents = async () => {
    const response = await Student.getAll();

    return response;
  };

  static getStudent = async (dto: StudentID) => {
    const { id } = dto;
    const response = await Student.getById(id);

    return response;
  };

  static getAssignments = async (dto: StudentID) => {
    const { id } = dto;
    const estudentExists = !!(await Student.getById(id));

    if (!estudentExists) {
      throw new StudentNotFoundException();
    }

    const response = await Student.getAssignments(id);

    return response;
  };

  static getGrades = async (dto: StudentID) => {
    const { id } = dto;
    const studentExists = !!(await Student.getById(id));

    if (!studentExists) {
      throw new StudentNotFoundException();
    }

    const response = await Student.getGrades(id);

    return response;
  };
}

export default StudentsService;

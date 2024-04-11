import { Database } from "../database";
import { CreateStudentDTO, StudentID } from "../dtos/students";
import { StudentNotFoundException } from "../shared/exceptions";

class StudentsService {
  constructor(private db: Database) {}

  createStudent = async (dto: CreateStudentDTO) => {
    const name = dto.name;

    const response = await this.db.students.save(name);

    return response;
  };

  getAllStudents = async () => {
    const response = await this.db.students.getAll();

    return response;
  };

  getStudent = async (dto: StudentID) => {
    const { id } = dto;
    const response = await this.db.students.getById(id);
    return response;
  };

  getAssignments = async (dto: StudentID) => {
    const { id } = dto;
    const estudentExists = !!(await this.db.students.getById(id));

    if (!estudentExists) {
      throw new StudentNotFoundException();
    }

    const response = await this.db.students.getAssignments(id);

    return response;
  };

  getGrades = async (dto: StudentID) => {
    const { id } = dto;
    const studentExists = !!(await this.db.students.getById(id));

    if (!studentExists) {
      throw new StudentNotFoundException();
    }

    const response = await this.db.students.getGrades(id);

    return response;
  };
}

export default StudentsService;

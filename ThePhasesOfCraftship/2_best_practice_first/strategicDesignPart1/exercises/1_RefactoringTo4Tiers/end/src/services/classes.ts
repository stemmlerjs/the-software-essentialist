import Database from "../database";
import { ClassId, CreateClassDTO, EnrollStudentDTO } from "../dtos/classes";
import {
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
  StudentNotFoundException,
} from "../shared/exceptions";

class ClassesService {
  constructor(private db: Database) {}

  async createClass(dto: CreateClassDTO) {
    const name = dto.name;

    const response = await this.db.classes.save(name);

    return response;
  }

  async enrollStudent(dto: EnrollStudentDTO) {
    const { studentId, classId } = dto;

    // check if student exists
    const student = await this.db.students.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    // check if class exists
    const cls = await this.db.classes.getById(classId);

    if (!cls) {
      throw new ClassNotFoundException(classId);
    }

    // check if student is already enrolled in class
    const isStudentEnrolled = !!(await this.db.classes.getEnrollment(
      classId,
      studentId
    ));

    if (isStudentEnrolled) {
      throw new StudentAlreadyEnrolledException();
    }

    const data = await this.db.classes.saveEnrollment(classId, studentId);

    return data;
  }

  async getAssignments (classId: ClassId) {
    const { id } = classId;
    const cls = await this.db.classes.getById(id);

    if (!cls) {
      throw new ClassNotFoundException(id);
    }

    const data = await this.db.classes.getAssignments(id);

    return data;
  };
}

export default ClassesService;

import { CreateClassDTO, EnrollStudentDTO } from "../dtos/classes";
import Class from "../models/class";
import Student from "../models/student";
import { ClassNotFoundException, StudentAlreadyEnrolledException, StudentNotFoundException } from "../shared/exceptions";

class ClassesService {
  static createClass = async (dto: CreateClassDTO) => {
    const name = dto.name;

    const response = await Class.save(name);

    return response;
  };

  static enrollStudent = async (dto: EnrollStudentDTO) => {
    const { studentId, classId } = dto;

    // check if student exists
    const student = await Student.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    // check if class exists
    const cls = await Class.getById(classId);

    if(!cls) {
      throw new ClassNotFoundException(classId);
    }

    // check if student is already enrolled in class
    const isStudentEnrolled = !!(await Class.getStudent(classId, studentId));

    if (isStudentEnrolled) {
      throw new StudentAlreadyEnrolledException();
    }

    const data = await Class.saveStudent(classId, studentId);

    return data;
  }
}

export default ClassesService;

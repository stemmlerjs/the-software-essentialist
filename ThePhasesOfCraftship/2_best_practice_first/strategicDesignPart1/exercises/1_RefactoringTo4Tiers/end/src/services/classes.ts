import { CreateClassDTO } from "../dtos/classes";
import Class from "../models/class";

class ClassesService {
  static createClass = async (dto: CreateClassDTO) => {
    const name = dto.name;

    const response = await Class.save(name);

    return response;
  };
}

export default ClassesService;

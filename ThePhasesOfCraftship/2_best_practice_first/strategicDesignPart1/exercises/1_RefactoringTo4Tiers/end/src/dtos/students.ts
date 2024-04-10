import { isMissingKeys, isUUID } from "../shared/utils";
import { InvalidRequestBodyException } from "../shared/exceptions";

class CreateStudentDTO {
    constructor(public name: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ['name'];
        if ( !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys)) {
            throw new InvalidRequestBodyException(requiredKeys)
        }

        const { name } = body as { name: string };

        return new CreateStudentDTO(name);
    }
}

class StudentID {
    constructor(public id: string) {}

    static fromRequest(params: unknown) {
        if ( !params || typeof params !== 'object' || 'id' in params === false) {
            throw new InvalidRequestBodyException(['id'])
        }

        const { id } = params as { id: string };

        if(!isUUID(id)) {
            throw new InvalidRequestBodyException(['id'])
        }

        return new StudentID(id);
    }
}


export {
    CreateStudentDTO,
    StudentID
};
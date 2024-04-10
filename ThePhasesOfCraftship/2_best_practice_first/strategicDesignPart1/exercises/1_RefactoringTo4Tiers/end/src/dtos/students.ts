import { isMissingKeys, isUUID } from "../utils/api_utils";
import { InvalidRequestBodyError } from "../utils/exceptions";

class CreateStudentDTO {
    constructor(public name: string) {}

    static fromRequest(body: unknown) {
        const requiredKeys = ['name'];
        if ( !body || typeof body !== 'object' || isMissingKeys(body, requiredKeys)) {
            throw new InvalidRequestBodyError(requiredKeys)
        }

        const { name } = body as { name: string };

        return new CreateStudentDTO(name);
    }
}

class GetStudentDTO {
    constructor(public id: string) {}

    static fromRequest(params: unknown) {
        if ( !params || typeof params !== 'object' || 'id' in params === false) {
            throw new InvalidRequestBodyError(['id'])
        }

        const { id } = params as { id: string };

        if(!isUUID(id)) {
            throw new InvalidRequestBodyError(['id'])
        }

        return new GetStudentDTO(id);
    }
}


export {
    CreateStudentDTO,
    GetStudentDTO
};
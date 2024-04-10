import { isMissingKeys } from "../utils/api_utils";
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

export {
    CreateStudentDTO
};
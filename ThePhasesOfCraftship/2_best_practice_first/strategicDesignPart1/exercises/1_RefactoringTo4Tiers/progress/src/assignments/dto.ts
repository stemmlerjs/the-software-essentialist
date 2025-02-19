import { InvalidRequestBodyException, ValidationError } from "../shared/errors";
import { isMissingKeys, isUUID } from "../shared/utils";

export class CreateAssignmentDTO {
	constructor(public classId: string, public title: string) {}

	static fromRequest(body: unknown) {
		const requiredKeys = ['classId', 'title'];
		
		if (isMissingKeys(body, requiredKeys)) {
			throw new InvalidRequestBodyException('Missing required keys');
		}

		const { classId, title } = body as Record<string, string>;

		return new CreateAssignmentDTO(classId, title);
	}
}
export class GetAssignmentDTO {
	constructor(public id: string) {}

	static fromRequest(params: unknown) {
		const { id } = params as Record<string, string>;

		if (!isUUID(id)) {
			throw new ValidationError('Invalid id');
		}

		return new GetAssignmentDTO(id);
	}
}
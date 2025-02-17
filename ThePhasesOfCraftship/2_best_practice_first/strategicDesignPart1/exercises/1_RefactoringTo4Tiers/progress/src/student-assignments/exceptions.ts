export const ErrorExceptionType = {
	StudentAssignmentNotFound: 'StudentAssignmentNotFound',
}

export class StudentAssignmentNotFoundException extends Error {
	constructor() {
		super('Student assignment not found');
		this.name = ErrorExceptionType.StudentAssignmentNotFound;
	}
}
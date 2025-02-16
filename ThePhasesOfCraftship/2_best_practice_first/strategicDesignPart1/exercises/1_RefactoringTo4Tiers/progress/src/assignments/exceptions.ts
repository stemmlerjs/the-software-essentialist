export const ErrorExceptionType = {
	AssignmentNotFound: 'AssignmentNotFound',
	InvalidGrade: 'InvalidGrade'
}

export class AssignmentNotFoundException extends Error {
	constructor(message = 'Assignment not found') {
		super(message);
		this.name = "AssignmentNotFoundException";
	}
}

export class InvalidGradeException extends Error {
	constructor(message = 'Invalid grade') {
		super(message);
		this.name = "InvalidGradeException";
	}
}
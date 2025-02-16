export const ErrorExceptionType = {
	ClassNotFound: 'ClassNotFound',
	StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
}

export class ClassNotFoundException extends Error {
	constructor() {
		super('Class not found');
		this.name = ErrorExceptionType.ClassNotFound;
	}
}

export class StudentAlreadyEnrolledException extends Error {
	constructor() {
		super('Student already enrolled in class');
		this.name = ErrorExceptionType.StudentAlreadyEnrolled;
	}
}
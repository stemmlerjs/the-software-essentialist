const ErrorExceptionType = {
	StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
}

export class StudentAlreadyEnrolledException extends Error {
	constructor() {
		super('Student already enrolled in class');
		this.name = ErrorExceptionType.StudentAlreadyEnrolled;
	}
}
export const ErrorExceptionType = {
	StudentNotFound: 'StudentNotFound',
	StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
}

export class StudentNotFoundException extends Error {
	constructor() {
	  super('Student not found');
	  this.name = ErrorExceptionType.StudentNotFound;
	}
  }
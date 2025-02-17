export const ErrorExceptionType = {
	ClassNotFound: 'ClassNotFound',
}

export class ClassNotFoundException extends Error {
	constructor() {
		super('Class not found');
		this.name = ErrorExceptionType.ClassNotFound;
	}
}


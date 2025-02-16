export const ErrorExceptionType = {
    ValidationError: 'ValidationError',
    ClassNotFound: 'ClassNotFound',
    AssignmentNotFound: 'AssignmentNotFound',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
}

export class InvalidRequestBodyException extends Error {
  constructor(message = 'Invalid request body') {
	super(message);
	this.name = "InvalidRequestBodyException";
  }
}

export class InvalidIdentifierException extends Error {
	constructor(message = 'Invalid identifier') {
		super(message);
		this.name = "InvalidIdentifierException";
	}
}
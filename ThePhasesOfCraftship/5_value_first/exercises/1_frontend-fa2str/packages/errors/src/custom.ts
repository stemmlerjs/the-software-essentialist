
type ErrorType = 
  // Application
  'ValidationError' |
  'PermissionError' |
  'NotFoundError' |
  'ConfictError' |
  'CustomError' |
  'UnauthorizedError' |

  // Server
  'InvalidRequestBodyError' |
  'InvalidParamsError' |
  'MissingRequestParamsError' | 
  'DatabaseError' |
  'GenericServerError'


export class CustomError extends Error {
  public type: ErrorType;
  constructor(message: string, type: ErrorType = "CustomError") {
    super(message)
    this.type = type;
  }
}
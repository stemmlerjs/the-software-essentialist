const statusCode = Object.freeze({
    SUCCESS: 200,
    CREATED: 201,
    VALIDATION_ERROR: 400,
    USER_NOT_FOUND: 404,
    EMAIL_ALREADY_IN_USE: 409,
    USER_NAME_ALREADY_TAKEN: 409,    
})

const errorMessage = Object.freeze({
    EMAIL_ALREADY_IN_USE: 'EmailAlreadyInUse',
    VALIDATION_ERROR: 'ValidationError',
    USER_NOT_FOUND: 'UserNotFound',
    USERNAME_ALREADY_TAKEN: 'UsernameAlreadyTaken'
})

export {statusCode, errorMessage};
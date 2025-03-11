"use strict";
// Todo: clean, similar to application.ts
// Todo: ensure all work still in front & back
// Todo: test
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrors = void 0;
const _1 = require(".");
var ServerErrors;
(function (ServerErrors) {
    class InvalidRequestBodyException extends _1.CustomError {
        constructor(missingKeys) {
            super("Body is missing required key: " + missingKeys.join(", "), "InvalidRequestBodyException");
        }
    }
    ServerErrors.InvalidRequestBodyException = InvalidRequestBodyException;
    class InvalidParamsException extends _1.CustomError {
        constructor() {
            super("Params are invalid", "InvalidParamsException");
        }
    }
    ServerErrors.InvalidParamsException = InvalidParamsException;
    class MissingRequestParamsException extends _1.CustomError {
        constructor(missingKeys) {
            super("Params is missing required key: " + missingKeys.join(", "), "InvalidRequestParamsException");
        }
    }
    ServerErrors.MissingRequestParamsException = MissingRequestParamsException;
    class InvalidRequestParamsException extends _1.CustomError {
        constructor(invalidKeys) {
            super("Params has invalid key: " + invalidKeys.join(", "), "InvalidRequestParamsException");
        }
    }
    ServerErrors.InvalidRequestParamsException = InvalidRequestParamsException;
    class ServerErrorException extends _1.CustomError {
        constructor(message = "") {
            super(message ? `An error occurred: ${message}` : "An error occurred", "ServerErrorException");
        }
    }
    ServerErrors.ServerErrorException = ServerErrorException;
    class DatabaseError extends _1.CustomError {
        constructor() {
            super("An error occurred saving to the database", "DatabaseError");
        }
    }
    ServerErrors.DatabaseError = DatabaseError;
})(ServerErrors || (exports.ServerErrors = ServerErrors = {}));

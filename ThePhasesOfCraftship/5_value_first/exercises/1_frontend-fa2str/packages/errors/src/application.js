"use strict";
// :check:
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationErrors = void 0;
const _1 = require(".");
var ApplicationErrors;
(function (ApplicationErrors) {
    // TODO: Encapsulate the additional message responsibilty
    class ConflictError extends _1.CustomError {
        conflictingEntity;
        additionalMessage;
        constructor(conflictingEntity, additionalMessage = "") {
            super(`Conflicting entity ${conflictingEntity}${additionalMessage ? `: ${additionalMessage}` : ''}`, "ConfictError");
            this.conflictingEntity = conflictingEntity;
            this.additionalMessage = additionalMessage;
        }
    }
    ApplicationErrors.ConflictError = ConflictError;
    class ValidationError extends _1.CustomError {
        message;
        constructor(message = "ValidationError") {
            super(message, "ValidationError");
            this.message = message;
        }
    }
    ApplicationErrors.ValidationError = ValidationError;
    class PermissionError extends _1.CustomError {
        message;
        constructor(message = "PermissionError") {
            super(message, "PermissionError");
            this.message = message;
        }
    }
    ApplicationErrors.PermissionError = PermissionError;
    class NotFoundError extends _1.CustomError {
        missingEntityType;
        additionalMessage;
        constructor(missingEntityType, additionalMessage = "") {
            super(`Could not find ${missingEntityType}${additionalMessage ? `: ${additionalMessage}` : ''}`, "NotFoundError");
            this.missingEntityType = missingEntityType;
            this.additionalMessage = additionalMessage;
        }
    }
    ApplicationErrors.NotFoundError = NotFoundError;
})(ApplicationErrors || (exports.ApplicationErrors = ApplicationErrors = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseResponse = void 0;
exports.fail = fail;
exports.success = success;
class UseCaseResponse {
    value;
    success;
    error;
    constructor(value, success, error) {
        this.value = value;
        this.success = success;
        this.error = error;
    }
    isSuccess() {
        return this.success;
    }
    getValue() {
        return this.value;
    }
    getError() {
        return this.error;
    }
}
exports.UseCaseResponse = UseCaseResponse;
function fail(error) {
    return new UseCaseResponse(undefined, false, error);
}
function success(value) {
    return new UseCaseResponse(value, true, undefined);
}

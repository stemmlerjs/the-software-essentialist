import ApiError from './ApiError';
import {statusCode, errorMessage} from '../constants';

export default class UserNotFoundError extends ApiError {
    constructor() {
        super(statusCode.USER_NOT_FOUND, errorMessage.USER_NOT_FOUND);
    }
}
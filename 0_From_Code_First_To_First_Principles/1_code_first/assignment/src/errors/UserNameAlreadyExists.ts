import ApiError from './ApiError';
import {statusCode, errorMessage} from '../constants';

export default class UserNameAlreadyExists extends ApiError {
    constructor() {
        super(statusCode.USER_NAME_ALREADY_TAKEN, errorMessage.USERNAME_ALREADY_TAKEN);
    }
}
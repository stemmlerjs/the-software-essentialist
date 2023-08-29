import ApiError from './ApiError';
import {statusCode, errorMessage} from '../constants';

export default class EmailAlreadyInUse extends ApiError {
    constructor() {
        super(statusCode.EMAIL_ALREADY_IN_USE, errorMessage.EMAIL_ALREADY_IN_USE);
    }
}
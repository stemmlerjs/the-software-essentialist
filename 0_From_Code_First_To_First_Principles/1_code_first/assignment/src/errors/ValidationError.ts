import ApiError from './ApiError';
import {statusCode, errorMessage} from '../constants';

export default class ValidationError extends ApiError {
    constructor() {
        super(statusCode.VALIDATION_ERROR, errorMessage.VALIDATION_ERROR);
    }
}
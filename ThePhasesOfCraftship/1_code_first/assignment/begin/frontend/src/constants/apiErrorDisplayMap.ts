import { ApiError } from './ApiError';

export const apiErrorDisplayMap: Record<ApiError, string> = {
  EmailAlreadyInUse: 'Email is already in use',
  UserNameAlreadyTaken: 'Username is already taken',
  ValidationError: 'Invalid data',
  ServerError: 'Server error',
  ClientError: 'Client error',
  UserNotFound: 'User not found',
};

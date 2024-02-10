import { object, string, number, date, InferType } from 'yup';

export const userRequestSchema = object({
  email: string().email().required(),
  userName: string().required(),
  firstName: string().required(),
  lastName: string().required(),
});
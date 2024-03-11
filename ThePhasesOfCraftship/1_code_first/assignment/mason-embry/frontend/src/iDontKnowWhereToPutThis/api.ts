import axios from 'axios';

import { RegisterDTO } from '../components/RegisterForm.tsx';
import { User } from './UserContext.tsx';

export interface ResponseDTO<T> {
  error: string | null;
  data: T | null;
  success: boolean;
}

export class API {
  async createUser(registerDTO: RegisterDTO) {
    const res = await axios.post<ResponseDTO<User>>(
      'http://localhost:3000/users/new',
      registerDTO,
    );

    return res.data.data;
  }
}

export const api = new API();

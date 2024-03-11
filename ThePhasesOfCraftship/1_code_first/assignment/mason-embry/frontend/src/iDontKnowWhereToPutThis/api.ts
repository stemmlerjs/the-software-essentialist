import axios from 'axios';

import { RegisterDTO } from '../components/RegisterForm.tsx';

export class API {
  createUser(registerDTO: RegisterDTO) {
    return axios.post('http://localhost:3001/users', registerDTO);
  }
}

export const api = new API();

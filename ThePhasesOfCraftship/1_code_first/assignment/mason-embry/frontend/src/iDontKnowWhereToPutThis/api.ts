import axios from 'axios';

import { RegisterDTO } from '../components/RegisterForm.tsx';

export class API {
  createUser(registerDTO: RegisterDTO) {
    return axios.post('http://localhost:3000/users/new', registerDTO);
  }
}

export const api = new API();

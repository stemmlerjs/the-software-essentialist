import { RegistrationInput } from "./components/registrationForm";
import axios from 'axios'

export const api = {
  register: (input: RegistrationInput) => {
    return axios.post('http://localhost:3000/api/users/register', {
      data: input
    })
  }
}
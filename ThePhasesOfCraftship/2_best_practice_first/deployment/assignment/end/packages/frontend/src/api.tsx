
// api.tsx
import { CreateUserParams } from '@dddforum/shared/src/api/users'
import axios from 'axios'

export const api = {
  posts: {
    getPosts: () => {
      return axios.get('http://localhost:3000/posts?sort=recent')
    }
  },
  register: (input: CreateUserParams) => {
    return axios.post('http://localhost:3000/users/new', {
      ...input
    })
  }
}


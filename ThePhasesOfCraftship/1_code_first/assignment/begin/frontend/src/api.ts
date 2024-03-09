import { RegistrationInput } from './types/RegistrationInput';
import axios from 'axios';
import { Response } from './types/Response';
import { User } from './types/User';
import { Post } from './types/Post';
import { axiosResponded } from './utils/axiosResponded';

export const api = {
  posts: {
    getPosts: () =>
      axiosResponded<{ posts: Post[] }>(() =>
        axios.get<Response<{ posts: Post[] }>>(
          'http://localhost:3000/posts?sort=recent'
        )
      ),
  },
  register: (input: RegistrationInput) =>
    axiosResponded<User>(() =>
      axios.post('http://localhost:3000/users/new', input)
    ),
};

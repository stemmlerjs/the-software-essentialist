import axios from 'axios';

import { RegisterDTO } from '../components/RegisterForm.tsx';
import { User } from './UserContext.tsx';

export interface Post {
  id: number;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  votes: Vote[];
  memberPostedBy: Member;
  comments: Comment[];
}

interface Vote {
  id: number;
  postId: number;
  memberId: number;
  voteType: string;
}

interface Member {
  id: number;
  userId: number;
  user: User;
}

interface Comment {
  id: number;
  postId: number;
  text: string;
  memberId: number;
  parentCommentId: number | null;
}

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

  async getPosts() {
    const res = await axios.get<ResponseDTO<Post[]>>(
      'http://localhost:3000/posts?sort=recent',
    );
    return res.data.data;
  }
}

export const api = new API();

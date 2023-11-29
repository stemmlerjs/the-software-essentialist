
import axios from 'axios';

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: () => {
      return axios.get(`${apiURL}/posts?sort=recent`)
    }
  }
}
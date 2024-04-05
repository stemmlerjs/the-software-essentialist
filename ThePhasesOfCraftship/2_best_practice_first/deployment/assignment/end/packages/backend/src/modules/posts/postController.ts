
import express from 'express';
import { Errors } from '../../shared/errors/errors';
import { PostService } from './postService';
import { GetPostsQuery, GetPostsQueryOptions } from '@dddforum/shared/src/api/posts';

export class PostsController {

  constructor (private postService: PostService) {
  }

  async getPosts (req: express.Request, res: express.Response) {
    const { sort } = req.query;
      
    let query: GetPostsQuery = {
      sort: sort as GetPostsQueryOptions
    }

    const result = await this.postService.getPosts(query);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      switch(result.error) {
        case Errors.ClientError:
          return res.status(400).json(result)
        case Errors.ServerError:
        default:
          return res.status(500).json(result);
      }
    }
  }

}
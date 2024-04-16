import { PostDTO } from "../postDTO";
import { PostRepo } from "../postRepo";

export class InMemoryPostRepo implements PostRepo {
  
  getPosts(): Promise<PostDTO[]> {
    throw new Error("Method not implemented.");
  }
  
}
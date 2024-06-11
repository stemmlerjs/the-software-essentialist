
import { PostDTO } from "./postDTO";

export interface PostRepo {
  getPosts (): Promise<PostDTO[]>
}

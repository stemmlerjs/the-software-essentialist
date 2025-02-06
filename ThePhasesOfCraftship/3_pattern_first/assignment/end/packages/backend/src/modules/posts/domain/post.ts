import { PostDTO } from "@dddforum/shared/src/api/posts";

interface PostProps {
  title: string;
  content?: string;
}

export class Post {
  constructor (private props: PostProps) {

  }
  public static create (props: PostProps) {
    return new Post(props);
  }

  public toDTO (): PostDTO {
    // TODO: implement this
    return {
      id: "123",
      member: {
        memberId: "123",
      },
      title: this.props.title,
      content: this.props.content,
      votes: [],
      postType: "text",
      comments: [],
      dateCreated: new Date().toISOString(),
    }
  }
}

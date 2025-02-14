import { PostDTO } from "@dddforum/shared/src/api/posts";
import { Votes } from "./votes";
import { Post as PostPrismaModel } from "@prisma/client";
import { Member as MemberPrismaModel } from "@prisma/client";

interface PostProps {
  title: string;
  link: string;
  votes: Votes;
  content?: string;
}

export class Post {
  constructor (private props: PostProps) {

  }

  get title () {
    return this.props.title;
  }

  get link () {
    return this.props.link;
  }

  get votes () {
    return this.props.votes;
  }

  public static create (props: PostProps) {
    return new Post(props);
  }

  public static toDTO (postModel: PostPrismaModel, memberModel: MemberPrismaModel): PostDTO {
    return {
      id: postModel.id,
      title: postModel.title,
      content: postModel.content,
      postType: postModel.postType,
      dateCreated: postModel.dateCreated.toISOString(),
      member: {
        memberId: postModel.memberId,
        // TODO: ensure in model
        username: memberModel.username,
      },
      // TODO: add.
      voteScore: postModel.voteScore,
      comments: []
    }

  }

  // public toDTO (): PostDTO {
  //   // TODO: implement this
  //   return {
  //     id: "123",
  //     member: {
  //       memberId: "123",
  //     },
  //     title: this.props.title,
  //     content: this.props.content,
  //     votes: [],
  //     postType: "text",
  //     comments: [],
  //     dateCreated: new Date().toISOString(),
  //   }
  // }
}

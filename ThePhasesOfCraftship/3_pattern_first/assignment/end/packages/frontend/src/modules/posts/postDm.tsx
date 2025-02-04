import { Posts } from "@dddforum/shared/src/api";

interface PostDmProps {
  id: number;
  title: string;
  dateCreated: string;
  member: {
    memberId: string;
  }
  votes: Vote[],
  comments: Comment[]
}

export type Vote = {
  id: number;
  postId: number;
  voteType: "Upvote" | "Downvote";
};

export type Comment = {};

// title: post.title,
//       dateCreated: post.dateCreated,
//       memberPostedBy: post.memberPostedBy,
//       comments: post.comments,
//       votes: post.votes,

export class PostDm {

  private props: PostDmProps;

  constructor (props: PostDmProps) {
    this.props = props;
  }

  get title () {
    return this.props.title;
  }

  get dateCreated () {
    return this.props.dateCreated;
  }

  get memberPostedBy () {
    return this.props.member.memberId;
  }

  get votes () {
    return this.props.votes;
  }

  get comments () {
    return this.props.comments;
  }
  
  
  public static fromDTO (postDTO: Posts.Post) {
    return new PostDm({
      id: postDTO.id,
      title: postDTO.title,
      dateCreated: postDTO.dateCreated,
      member: {
        memberId: postDTO.member.memberId
      },
      votes: postDTO.votes
    });
  }

}

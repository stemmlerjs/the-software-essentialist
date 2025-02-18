import { EventBus } from "../../../shared/eventBus/ports/eventBus";
import { VoteOnComment } from "../../comments/application/useCases/voteOnComment/voteOnComment";
import { CommentRepository } from "../../comments/repos/ports/commentRepository";
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { PostsRepository } from "../../posts/repos/ports/postsRepository";
import { VoteRepository } from "../repos/ports/voteRepository";
import { VoteOnCommentCommand, VoteOnPostCommand } from "../votesCommands";
import { VoteOnPost } from "./useCases/voteOnPost/voteOnPost";

export class VotesService {

  constructor(
    private memberRepository: MembersRepository, 
    private commentRepository: CommentRepository, 
    private postRepository: PostsRepository, 
    private voteRepository: VoteRepository,
    private eventBus: EventBus
  ) {

  }

  castVoteOnComment (command: VoteOnCommentCommand) {
    return new VoteOnComment(
      this.memberRepository, this.commentRepository, this.voteRepository, this.eventBus
    ).execute(command);
  }

  castVoteOnPost (command: VoteOnPostCommand) {
    return new VoteOnPost(
      this.memberRepository, this.postRepository, this.voteRepository, this.eventBus
    ).execute(command);
  }

}

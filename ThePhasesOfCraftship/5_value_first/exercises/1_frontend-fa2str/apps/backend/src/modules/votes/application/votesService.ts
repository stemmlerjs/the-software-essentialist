

import { VoteOnComment } from "../../comments/application/useCases/voteOnComment/voteOnComment";
import { CommentRepository } from "../../comments/repos/ports/commentRepository";
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { PostsRepository } from "../../posts/repos/ports/postsRepository";
import { VoteRepository } from "../repos/ports/voteRepository";

import { UpdateMemberReputationScore } from "./useCases/updateMemberReputation/updateMemberReputationScore";
import { VoteOnPost } from "./useCases/voteOnPost/voteOnPost";
import { Commands } from '@dddforum/api/votes'

export class VotesService {

  constructor(
    private memberRepository: MembersRepository, 
    private commentRepository: CommentRepository, 
    private postRepository: PostsRepository, 
    private voteRepository: VoteRepository,
  ) {

  }

  castVoteOnComment (command: Commands.VoteOnCommentCommand) {
    return new VoteOnComment(
      this.memberRepository, this.commentRepository, this.voteRepository
    ).execute(command);
  }

  castVoteOnPost (command: Commands.VoteOnPostCommand) {
    return new VoteOnPost(
      this.memberRepository, this.postRepository, this.voteRepository, 
    ).execute(command);
  }

  updateMemberReputationScore(command: Commands.UpdateMemberReputationScoreCommand) {
    return new UpdateMemberReputationScore(
      this.memberRepository,
      this.voteRepository,
    ).execute(command);
  }

}

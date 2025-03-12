
import express from "express";
import { VoteOnPostAPIResponse  } from "@dddforum/api/votes";
import { ErrorHandler } from "../../shared/errors";
import { VotesService } from "./application/votesService";
import { PostVote } from "../posts/domain/postVote";
import { Commands } from "@dddforum/api/votes";

export class VotesController {
  private router: express.Router;

  constructor(
    private votesService: VotesService,
    private errorHandler: ErrorHandler,
  ) {
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupRoutes() {
    this.router.post("/post/:postId/new", this.castVoteOnPost.bind(this));
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private async castVoteOnPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {

      const command = new Commands.VoteOnPostCommand({
        postId: req.params.postId,
        voteType: req.body.voteType,
        memberId: req.body.memberId
      });

      const result = await this.votesService.castVoteOnPost(command);

      if (!result.isSuccess()) {
        const error = result.getError();
        return next(error);
      } else {
        const postVote = result.getValue() as PostVote;

        const response: VoteOnPostAPIResponse = {
          success: true,
          data: postVote.toDTO()
        };
        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

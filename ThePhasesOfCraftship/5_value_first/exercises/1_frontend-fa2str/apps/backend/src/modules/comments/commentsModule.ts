
import { Config } from "../../shared/config"; // TODO: Move this to the shared config
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Database } from "@dddforum/database/src"
import { CommentRepository } from "../comments/repos/ports/commentRepository";
import { ProductionCommentsRepository } from "./repos/adapters/productionCommentRepository";
import { CommentsService } from "./application/commentsService";

export class CommentsModule extends ApplicationModule {
  private commentsRepository: CommentRepository;

  private constructor(
    private db: Database,
    config: Config,
  ) {
    super(config);
    this.commentsRepository = this.createCommentRepository();
  }

  static build(db: Database, config: Config) {
    return new CommentsModule(db, config);
  }

  private createCommentRepository() {
    if (this.commentsRepository) return this.commentsRepository;

    return new ProductionCommentsRepository(this.db.getConnection());
  }

  public getCommentsRepository() {
    return this.commentsRepository;
  }

  public getCommentsService () {
    // Not yet implemented
    return new CommentsService();
  }
}

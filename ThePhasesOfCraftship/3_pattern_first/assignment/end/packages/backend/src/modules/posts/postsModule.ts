
import { Config } from "../../shared/config";
import { WebServer } from "../../shared/http/webServer";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { PostsController } from "./postsController";
import { postsErrorHandler } from "./postsErrors";
import { Database } from "../../shared/database";
import { InMemoryPostsRepository } from "./repos/adapters/inMemoryPostsRepository";
import { ProductionPostsRepository } from "./repos/adapters/productionPostsRepository";
import { PostsRepository } from "./repos/ports/postsRepository";
import { MembersRepository } from "../members/repos/ports/membersRepository";
import { PostsService } from "./application/postsService";
import { VoteRepository } from "../votes/repos/ports/voteRepository";

export class PostsModule extends ApplicationModule {
  private postsRepository: PostsRepository;
  private postsService: PostsService;
  private postsController: PostsController;

  private constructor(
    private db: Database,
    config: Config,
    private membersRepository: MembersRepository,
    private voteRepository: VoteRepository,
  ) {
    super(config);
    this.postsRepository = this.createPostsRepository();
    this.postsService = this.createPostsService(membersRepository, voteRepository);
    this.postsController = this.createPostsController();
  }

  static build(db: Database, config: Config, membersRepository: MembersRepository, voteRepository: VoteRepository) {
    return new PostsModule(db, config, membersRepository, voteRepository);
  }

  private createPostsRepository() {
    if (this.postsRepository) return this.postsRepository;

    if (this.shouldBuildFakeRepository) {
      return InMemoryPostsRepository.createWithSeedData();
    }

    return new ProductionPostsRepository(this.db.getConnection());
  }

  private createPostsService(membersRepository: MembersRepository, voteRepository: VoteRepository) {
    return new PostsService(this.postsRepository, membersRepository, voteRepository);
  }

  private createPostsController() {
    return new PostsController(this.postsService, postsErrorHandler);
  }

  public getPostsController() {
    return this.postsController;
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/posts", this.postsController.getRouter());
  }

  public getPostsService() {
    return this.postsService;
  }

  public getPostsRepository() {
    return this.postsRepository;
  }
}

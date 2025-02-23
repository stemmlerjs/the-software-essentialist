
import { CommentsModule } from "../../modules/comments/commentsModule";
import { MembersModule } from "../../modules/members/membersModule";
import { VotesModule } from "../../modules/votes/votesModule";
import { Application } from "../application/applicationInterface";
import { Config } from "../config";
import { Database } from "../database";
import { FakeDatabase, PrismaDatabase } from "../database/database";
import { InMemoryEventBus } from "@dddforum/shared/src/events/bus/adapters/inMemoryEventBus";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { WebServer } from "../http";
import {
  UsersModule,
  PostsModule,
  NotificationsModule,
  MarketingModule,
} from "@dddforum/backend/src/modules";

export class CompositionRoot {
  private static instance: CompositionRoot | null = null;

  private webServer: WebServer;
  private eventBus: InMemoryEventBus;
  private dbConnection: Database;
  private config: Config;
  private eventsTable: EventOutboxTable;

  private usersModule: UsersModule;
  private marketingModule: MarketingModule;
  
  
  private notificationsModule: NotificationsModule;
  private commentsModule: CommentsModule;
  private postsModule: PostsModule;
  private membersModule: MembersModule;
  private votesModule: VotesModule;

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }
    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.dbConnection = this.createDBConnection();
    this.eventBus = this.createEventBus();
    this.eventsTable = this.createEventsTable();
    
   
    this.notificationsModule = this.createNotificationsModule();
    this.marketingModule = this.createMarketingModule();
    this.membersModule = this.createMembersModule();
    this.postsModule = this.createPostsModule();
    this.commentsModule = this.createCommentsModule();
    this.votesModule = this.createVotesModule();
    
    this.usersModule = this.createUsersModule();
    
    this.webServer = this.createWebServer();
    this.mountRoutes();
  }

  createEventsTable () {
    return new EventOutboxTable(this.dbConnection.getConnection());
  }

  createCommentsModule () {
    return CommentsModule.build(this.dbConnection, this.config);
  }

  createMembersModule() {
    return MembersModule.build(
      this.dbConnection, 
      this.eventBus, 
      this.config
    );
  }

  createNotificationsModule() {
    return NotificationsModule.build(this.eventBus, this.config);
  }

  createMarketingModule() {
    return MarketingModule.build(this.config);
  }

  createUsersModule() {
    return UsersModule.build(
      this.dbConnection,
      this.notificationsModule.getTransactionalEmailAPI(),
      this.membersModule.getMembersRepository(),
      this.config,
    );
  }

  createVotesModule () {
    return VotesModule.build(
      this.dbConnection, 
      this.membersModule.getMembersRepository(),
      this.commentsModule.getCommentsRepository(),
      this.postsModule.getPostsRepository(),
      this.eventBus,
      this.eventsTable,
      this.config
    );
  }

  createPostsModule() {
    return PostsModule.build(
      this.dbConnection,
      this.config,
      this.eventBus,
      this.membersModule.getMembersRepository(),
    );
  }

  getDatabase() {
    if (!this.dbConnection) this.createDBConnection();
    return this.dbConnection;
  }

  getEventBus() {
    return this.eventBus;
  }

  createEventBus() {
    return new InMemoryEventBus();
  }

  createWebServer() {
    return new WebServer({ port: 3000, env: this.config.env });
  }

  getWebServer() {
    return this.webServer;
  }

  private mountRoutes() {
    this.marketingModule.mountRouter(this.webServer);
    this.usersModule.mountRouter(this.webServer);
    this.postsModule.mountRouter(this.webServer);
  }

  private createDBConnection() {
    if (this.shouldBuildFakeRepository()) {
      return new FakeDatabase();
    }
    const dbConnection = new PrismaDatabase();
    if (!this.dbConnection) {
      this.dbConnection = dbConnection;
    }
    return dbConnection;
  }

  getApplication(): Application {
    return {
      users: this.usersModule.getUsersService(),
      posts: this.postsModule.getPostsService(),
      marketing: this.marketingModule.getMarketingService(),
      notifications: this.notificationsModule.getNotificationsService(),
      votes: this.votesModule.getVotesService(),
    };
  }

  getTransactionalEmailAPI() {
    return this.notificationsModule.getTransactionalEmailAPI();
  }

  getContactListAPI() {
    return this.marketingModule.getContactListAPI();
  }

  getModule (moduleName: 'members' | 'users' | 'votes' | 'posts' | 'notifications' | 'marketing') {
    switch (moduleName) {
      case 'members':
        return this.membersModule;
      case 'users':
        return this.usersModule;
      case 'posts':
        return this.postsModule;
      case 'votes':
        return this.votesModule;
      case 'notifications':
        return this.notificationsModule;
      case 'marketing':
        return this.marketingModule;
      default:
        throw new Error(`Module ${moduleName} not found`);
    }
  }

  getRepositories() {
    return {
      users: this.usersModule.getUsersRepository(),
      posts: this.postsModule.getPostsRepository(),
    };
  }

  private shouldBuildFakeRepository() {
    return (
      this.config.getScript() === "test:unit" ||
      this.config.getEnvironment() === "development"
    );
  }
}

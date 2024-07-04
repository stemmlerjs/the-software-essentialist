import { PrismaClient } from "@prisma/client";
import { generateRandomPassword } from "../utils";
import { User } from "@dddforum/shared/src/api/users";
import { Post } from "@dddforum/shared/src/api/posts";
import { ServerErrorException } from "../exceptions";
import { CreateUserCommand } from "../../modules/users/usersCommand";

export interface UsersPersistence {
  save(user: CreateUserCommand): Promise<User & { password: string }>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
}

export interface PostsPersistence {
  findPosts(sort: string): Promise<Post[]>;
}

export class Database {
  public users: UsersPersistence;
  public posts: PostsPersistence;
  private connection: PrismaClient;

  constructor() {
    this.connection = new PrismaClient();
    this.users = this.buildUsersPersistence();
    this.posts = this.buildPostsPersistence();
  }

  getConnection() {
    return this.connection;
  }

  async connect() {
    await this.connection.$connect();
  }

  private buildUsersPersistence(): UsersPersistence {
    return {
      save: this.saveUser.bind(this),
      findUserByEmail: this.findUserByEmail.bind(this),
      findUserByUsername: this.findUserByUsername.bind(this),
    };
  }

  private async saveUser(user: CreateUserCommand) {
    const { email, firstName, lastName, username } = user;
    return await this.connection.$transaction(async () => {
      const user = await this.connection.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: generateRandomPassword(10),
        },
      });
      await this.connection.member.create({
        data: { userId: user.id },
      });

      return user;
    });
  }

  private async findUserByEmail(email: string) {
    return this.connection.user.findFirst({ where: { email } });
  }

  private async findUserByUsername(username: string) {
    return this.connection.user.findFirst({ where: { username } });
  }

  private buildPostsPersistence(): PostsPersistence {
    return {
      findPosts: this.findPosts.bind(this),
    };
  }

  private async findPosts(_: string): Promise<Post[]> {
    try {
      const posts = await this.connection.post.findMany({
        orderBy: { dateCreated: "desc" },
      });
      const formattedPosts = posts.map(this.formatPost);

      return formattedPosts;
    } catch (error) {
      throw new ServerErrorException();
    }
  }

  private formatPost(post: any): Post {
    return {
      id: post.id,
      memberId: post.memberId,
      postType: post.postType,
      title: post.title,
      content: post.content,
      dateCreated: post.dateCreated.toISOString(),
      memberPostedBy: {
        user: {
          id: post.member.id,
          email: post.member.user.email,
          username: post.member.user.username,
          firstName: post.member.user.firstName,
          lastName: post.member.user.lastName
        }
      },
      votes: post.votes,
      comments: post.comments,
    };
  }
}

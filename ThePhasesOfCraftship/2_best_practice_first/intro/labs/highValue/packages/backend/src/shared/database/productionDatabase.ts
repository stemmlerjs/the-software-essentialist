import { PrismaClient } from "@prisma/client"
import { Database } from "./database";

// class PostsPersistence {
//   constructor (private prisma: PrismaClient) {

//   }

//   getPosts () {
//     return this.prisma.post.findMany({
//       include: {
//         votes: true, // Include associated votes for each post
//         memberPostedBy: {
//           include: {
//             user: true
//           }
//         },
//         comments: true
//       },
//       orderBy: {
//         dateCreated: 'desc', // Sorts by dateCreated in descending order
//       },
//     });
//   }
// }

// export class ProductionDatabase implements Database {
//   private connection: PrismaClient;

//   public users: UsersPersistence;
//   public posts: PostsPersistence; 

//   constructor () {
//     this.connection = new PrismaClient();
//     this.users = new UsersPersistence(this.connection);
//     this.posts = new PostsPersistence(this.connection);
//   }

//   getConnection () {
//     return this.connection;
//   }

//   async connect () {
//     await this.connection.$connect()
//   }
// }


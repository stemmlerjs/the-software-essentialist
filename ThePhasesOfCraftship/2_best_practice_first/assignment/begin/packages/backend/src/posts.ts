
import { prisma } from "./database";

export async function getRecentPosts () {
  try {

    /**
     * How to get popular posts?
     * Code-First Way: just compute on the fly (super expensive, make it work)
     */

    const postsWithVotes = await prisma.post.findMany({
      include: {
        votes: true, // Include associated votes for each post
        memberPostedBy: {
          include: {
            user: true
          }
        },
        comments: true
      },
      orderBy: {
        dateCreated: 'desc', // Sorts by dateCreated in descending order
      },
    });
  
    return postsWithVotes;
  } catch (err) {
    console.log(err);
  }
}

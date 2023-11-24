
import { prisma } from '../database';

export async function getPopularPosts() {
  try {
    const postIdsWithHighestVoteCount = await prisma.vote.groupBy({
      by: ['postId'],
      _count: {
        postId: true,
      },
      orderBy: {
        _count: {
          postId: 'desc',
        },
      },
      take: 10, // Adjust this value to get the top N postIds with the highest vote count
    });

    const topPostIds = postIdsWithHighestVoteCount.map((entry) => entry.postId);

    const popularPosts = await prisma.post.findMany({
      where: {
        id: {
          in: topPostIds,
        },
      },
    });

    return popularPosts;
  } catch (err) {
    console.log(err);
  }
}

export async function editUser(userId: number, userData: any) {
  const user = await prisma.user.update({ where: { id: userId }, data: userData });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

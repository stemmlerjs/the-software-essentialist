
import { Config } from '@dddforum/config';
import { PrismaDatabase } from '@dddforum/database';

const config = Config();
const database = new PrismaDatabase(config);
const prisma = database.getConnection();

async function main() {
  console.log('Starting seed...');

  // Create three members
  const [member1, member2, member3] = await Promise.all([
    prisma.member.create({
      data: {
        id: 'seed-member-1',
        userId: 'auth0|seed-user-1',
        username: 'seeduser',
        reputationLevel: 'Level1',
        lastUpdated: new Date(),
      },
    }),
    prisma.member.create({
      data: {
        id: 'seed-member-2',
        userId: 'auth0|seed-user-2',
        username: 'alice_ddd',
        reputationLevel: 'Level1',
        lastUpdated: new Date(),
      },
    }),
    prisma.member.create({
      data: {
        id: 'seed-member-3',
        userId: 'auth0|seed-user-3',
        username: 'bob_developer',
        reputationLevel: 'Level1',
        lastUpdated: new Date(),
      },
    }),
  ]);

  console.log('Created seed members:', [member1.username, member2.username, member3.username].join(', '));

  // Create 5 posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        id: 'seed-post-1',
        memberId: member1.id,
        postType: 'DISCUSSION',
        title: 'Introduction to Domain-Driven Design',
        content: 'DDD is an approach to software development that centers the development on programming a domain model that has a rich understanding of the processes and rules of a domain...',
        lastUpdated: new Date(),
      },
    }),
    prisma.post.create({
      data: {
        id: 'seed-post-2',
        memberId: member1.id,
        postType: 'QUESTION',
        title: 'How to implement Value Objects?',
        content: 'I\'m struggling with implementing value objects in my domain model. What\'s the best way to ensure immutability and equality comparison?',
        lastUpdated: new Date(),
      },
    }),
    prisma.post.create({
      data: {
        id: 'seed-post-3',
        memberId: member1.id,
        postType: 'LINK',
        title: 'Great Article on Aggregate Design',
        link: 'https://example.com/aggregate-design',
        content: null,
        lastUpdated: new Date(),
      },
    }),
    prisma.post.create({
      data: {
        id: 'seed-post-4',
        memberId: member1.id,
        postType: 'DISCUSSION',
        title: 'Event Sourcing vs Traditional Architecture',
        content: 'Let\'s discuss the pros and cons of event sourcing compared to traditional CRUD-based architectures...',
        lastUpdated: new Date(),
      },
    }),
    prisma.post.create({
      data: {
        id: 'seed-post-5',
        memberId: member1.id,
        postType: 'QUESTION',
        title: 'Best Practices for Domain Events',
        content: 'What are some best practices for handling domain events in a DDD application? How do you ensure proper event propagation?',
        lastUpdated: new Date(),
      },
    }),
  ]);

  console.log(`Created ${posts.length} seed posts`);

  // Add comments from member2 and member3 to each post
  const comments = await Promise.all([
    // Comments on Post 1
    prisma.comment.create({
      data: {
        memberId: member2.id,
        postId: posts[0].id,
        text: 'Great introduction! I would also add that DDD is particularly useful for complex domains where the business logic is crucial.',
        lastUpdated: new Date(),
      },
    }),
    prisma.comment.create({
      data: {
        memberId: member3.id,
        postId: posts[0].id,
        text: 'I\'ve been using DDD in my projects for a year now. It really helps with maintaining clean architecture.',
        lastUpdated: new Date(),
      },
    }),

    // Comments on Post 2
    prisma.comment.create({
      data: {
        memberId: member2.id,
        postId: posts[1].id,
        text: 'Make sure to implement equals() and hashCode() methods for proper value object comparison.',
        lastUpdated: new Date(),
      },
    }),
    prisma.comment.create({
      data: {
        memberId: member3.id,
        postId: posts[1].id,
        text: 'Consider using TypeScript\'s readonly modifier to enforce immutability.',
        lastUpdated: new Date(),
      },
    }),

    // Comments on Post 3
    prisma.comment.create({
      data: {
        memberId: member2.id,
        postId: posts[2].id,
        text: 'This article really helped me understand aggregate boundaries better.',
        lastUpdated: new Date(),
      },
    }),
    prisma.comment.create({
      data: {
        memberId: member3.id,
        postId: posts[2].id,
        text: 'The examples in this article are very practical. Thanks for sharing!',
        lastUpdated: new Date(),
      },
    }),

    // Comments on Post 4
    prisma.comment.create({
      data: {
        memberId: member2.id,
        postId: posts[3].id,
        text: 'Event sourcing can be powerful but comes with its own complexity. Important to weigh the trade-offs.',
        lastUpdated: new Date(),
      },
    }),
    prisma.comment.create({
      data: {
        memberId: member3.id,
        postId: posts[3].id,
        text: 'One challenge with event sourcing is handling schema evolution over time.',
        lastUpdated: new Date(),
      },
    }),

    // Comments on Post 5
    prisma.comment.create({
      data: {
        memberId: member2.id,
        postId: posts[4].id,
        text: 'Always validate domain events and make them immutable.',
        lastUpdated: new Date(),
      },
    }),
    prisma.comment.create({
      data: {
        memberId: member3.id,
        postId: posts[4].id,
        text: 'Consider using an event bus for loose coupling between aggregates.',
        lastUpdated: new Date(),
      },
    }),
  ]);

  console.log(`Created ${comments.length} comments`);
}

main()
  .catch((e) => {
    console.error('Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

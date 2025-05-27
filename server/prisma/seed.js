const { PrismaClient } = require("../../generated/prisma");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  const users = [];

  // Create 10 users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        githubId: faker.string.uuid(),
        username: faker.internet.username(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        profilePicture: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  // Create posts for each user
  for (const user of users) {
    for (let j = 0; j < 3; j++) {
      const post = await prisma.post.create({
        data: {
          content: faker.lorem.paragraph(),
          imageUrl: faker.image.urlPicsumPhotos(),
          authorId: user.id,
        },
      });

      // Add likes to post
      const likeUsers = faker.helpers.arrayElements(users, 3);
      for (const liker of likeUsers) {
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: liker.id,
          },
        });
      }

      // Add comments
      for (let k = 0; k < 2; k++) {
        const commenter = faker.helpers.arrayElement(users);
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            postId: post.id,
            authorId: commenter.id,
          },
        });
      }
    }
  }

  // Create follow relationships
  for (const user of users) {
    const toFollow = faker.helpers.arrayElements(
      users.filter((u) => u.id !== user.id),
      3
    );
    for (const followee of toFollow) {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followee.id,
          status: "accepted",
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log("Seeding complete 🌱");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

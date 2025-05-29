const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.user.id, // Assuming req.user is set by requireAuth middleware
      },
    });
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Return a list of posts by users the current user follows
const getFeed = async (req, res) => {
  const userId = req.user.id;
  try {
    // Get the IDs of users the current user follows
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((follow) => follow.followingId);

    // Fetch posts from followed users
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: followingIds },
      },
      orderBy: {
        createdAt: "desc", // Order by creation date, most recent first
      },
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc", // Order comments by creation date
          },
        },
      },
    });

    // Add likedByCurrentUser field to each post
    const postsWithLikes = posts.map((post) => {
      const likedByCurrentUser = post.likes.some(
        (like) => like.userId === userId
      );
      return {
        ...post,
        likedByCurrentUser,
      };
    });

    // Return the posts
    res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
};

// Toggle like on a post
const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if the user has already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingLike) {
      // If the like exists, remove it
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // If the like does not exist, create it
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }

    // Get new like count
    const likesCount = await prisma.like.count({
      where: { postId },
    });

    return res.status(200).json({ likesCount });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};

const commentOnPost = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const userId = req.user.id;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
      include: {
        author: true, // Include author details in the response
      },
    });
    res.status(201).json({ comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

module.exports = {
  createPost,
  getFeed,
  likePost,
  commentOnPost,
};

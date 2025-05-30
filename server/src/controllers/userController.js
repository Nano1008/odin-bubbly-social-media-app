const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    // Exclude the current user from the list
    const currentUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: currentUserId,
        },
      },
      include: {
        followers: true,
      },
    });

    // Add follow status for each user
    const usersWithFollowStatus = users.map((user) => {
      return {
        ...user,
        status: user.followers.some(
          (follower) => follower.followerId === currentUserId
        )
          ? "following"
          : "not following",
      };
    });
    res.status(200).json(usersWithFollowStatus);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Can't fetch users" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: true,
        following: true,
        posts: {
          orderBy: {
            createdAt: "desc", // Order posts by creation date
          },
          include: {
            author: true,
            likes: true,
            comments: {
              orderBy: {
                createdAt: "desc", // Order comments by creation date
              },
              include: {
                author: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the user is self
    const isSelf = user.id === req.user.id;

    // Check if the current user is following this user
    const follow = await prisma.follow.findFirst({
      where: {
        followingId: user.id,
        followerId: req.user.id,
      },
    });
    const isFollowing = follow ? true : false;

    // Add likedByCurrentUser field to each post
    const postsWithLikes = user.posts.map((post) => {
      const likedByCurrentUser = post.likes.some(
        (like) => like.userId === req.user.id
      );
      return {
        ...post,
        likedByCurrentUser,
      };
    });

    // Return the user data with follow status and posts
    user.posts = postsWithLikes;
    return res.status(200).json({
      ...user,
      isSelf,
      isFollowing,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Can't fetch user" });
  }
};

// Toggle follow user
const followUser = async (req, res) => {
  const followingId = req.params.id;
  const followerId = req.user.id;

  // Check if the user is trying to follow themselves
  if (followingId === followerId) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }

  try {
    // Check if the user is already following
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followingId,
        followerId,
      },
    });
    if (existingFollow) {
      // If already following, unfollow
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      // Return the remaining followers after unfollowing
      const followers = await prisma.follow.findMany({
        where: {
          followingId,
        },
      });
      return res.status(200).json({ followed: false, followers });
    } else {
      // If not following, follow the user
      await prisma.follow.create({
        data: {
          followingId,
          followerId,
        },
      });

      // Return the remaining followers after following
      const followers = await prisma.follow.findMany({
        where: {
          followingId,
        },
      });
      return res.status(200).json({ followed: true, followers });
    }
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Can't follow user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  followUser,
};

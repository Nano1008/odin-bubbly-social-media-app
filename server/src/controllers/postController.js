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

module.exports = {
  createPost,
};

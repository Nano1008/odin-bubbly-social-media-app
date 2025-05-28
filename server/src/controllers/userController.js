const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Can't fetch users" });
  }
};

module.exports = {
  getAllUsers,
};

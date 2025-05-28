const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth, userController.getUserById);
router.post("/follow/:id", requireAuth, userController.followUser);

module.exports = router;

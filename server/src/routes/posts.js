const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/", requireAuth, postController.createPost);
router.get("/feed", requireAuth, postController.getFeed);
router.post("/:id/like", requireAuth, postController.likePost);
router.post("/:id/comment", requireAuth /* commentPost */);

module.exports = router;
